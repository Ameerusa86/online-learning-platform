"use client";

import { useState, useEffect } from "react";
import { firestore, collection, addDoc, getDocs } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import Select, { SingleValue } from "react-select"; // Import SingleValue for typing
import toast from "react-hot-toast";
import React from "react";
import DashboardLayout from "../../../DashboardLayout";
import { useAuth } from "@/app/hooks/useAuth";

// Type definitions
interface Category {
  label: string;
  value: string;
}

interface Step {
  title: string;
  stepVideoURL: string;
}

// Slugify function to create a URL-friendly slug from the title
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainVideoURL, setMainVideoURL] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("Free");
  const [image, setImage] = useState<File | null>(null);
  const [steps, setSteps] = useState<Step[]>([
    {
      title: "",
      stepVideoURL: "",
    },
  ]);
  const router = useRouter();
  const storage = getStorage();
  const user = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(
        collection(firestore, "categories")
      );
      setCategories(
        categoriesSnapshot.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.data().name,
        }))
      );
    };

    fetchCategories();
  }, []);

  const handleCourseCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the slug from the title
    const slug = slugify(title);

    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `courses/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    try {
      await addDoc(collection(firestore, "courses"), {
        title,
        slug, // Save the slug in the database
        description,
        category: category ? category.value : "",
        mainVideoURL,
        price: priceType === "Free" ? "Free" : price,
        steps: steps.map((step) => ({
          ...step,
          stepVideoURL: step.stepVideoURL,
        })),
        imageUrl,
        author: user?.name || "Anonymous",
      });
      router.push("/admin/dashboard/courses");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleStepChange = (
    index: number,
    field: keyof Step,
    value: string
  ) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const addStepField = () => {
    setSteps([
      ...steps,
      {
        title: "",
        stepVideoURL: "",
      },
    ]);
  };

  const removeStepField = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePriceTypeChange = (
    selectedOption: SingleValue<{ label: string; value: string }>
  ) => {
    if (selectedOption) {
      setPriceType(selectedOption.value);
      if (selectedOption.value === "Free") {
        setPrice("");
      }
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10 space-y-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create a New Course
        </h1>
        <form onSubmit={handleCourseCreation} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">
                Course Category
              </label>
              <Select
                value={category}
                onChange={
                  setCategory as (option: SingleValue<Category>) => void
                } // Proper typing for SingleValue
                options={categories}
                placeholder="Select Category"
                className="mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">
                Main Video URL
              </label>
              <input
                type="text"
                value={mainVideoURL}
                onChange={(e) => setMainVideoURL(e.target.value)}
                placeholder="Main Video URL"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">
                Course Price
              </label>
              <Select
                value={{ label: priceType, value: priceType }}
                onChange={handlePriceTypeChange}
                options={[
                  { label: "Free", value: "Free" },
                  { label: "Custom", value: "Custom" },
                ]}
                placeholder="Select Price Type"
                className="mt-1"
              />
              {priceType === "Custom" && (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Course Price"
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">
                Course Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course Description"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              rows={4}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Course Steps</h2>
            {steps.map((step, index) => (
              <div
                key={index}
                className="border p-4 rounded-md mb-4 bg-gray-50"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Step {index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="block text-lg font-medium text-gray-700">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) =>
                        handleStepChange(index, "title", e.target.value)
                      }
                      placeholder="Step Title"
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-lg font-medium text-gray-700">
                      Step Video URL
                    </label>
                    <input
                      type="text"
                      value={step.stepVideoURL}
                      onChange={(e) =>
                        handleStepChange(index, "stepVideoURL", e.target.value)
                      }
                      placeholder="Step Video URL"
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeStepField(index)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStepField}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add another step
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Course
            </button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default CreateCourse;
