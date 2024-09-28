"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  firestore,
  getDoc,
} from "@/utils/firebase";
import Select from "react-select";
import { MultiValue, SingleValue } from "react-select";
import React from "react";
import DashboardLayout from "@/app/(backend Pages)/admin/DashboardLayout";
import Spinner from "@/components/spinner";

// Type definitions
interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  technology: string[];
  mainVideoURL: string;
  steps: {
    title: string;
    description: string;
    stepVideoURL: string;
  }[];
}

interface Category {
  label: string;
  value: string;
}

interface Technology {
  label: string;
  value: string;
}

interface Params {
  params: {
    id: string;
  };
}

const EditCourse: React.FC<Params> = ({ params }) => {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<SingleValue<Category> | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [technology, setTechnology] = useState<MultiValue<Technology>>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [mainVideoURL, setMainVideoURL] = useState<string>("");
  const [steps, setSteps] = useState<Course["steps"]>([]);

  const [isFree, setIsFree] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("Free");
  const [priceError, setPriceError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Received id:", id);

        // Retrieve the course document by id directly
        const docRef = doc(firestore, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = {
            id: docSnap.id,
            ...docSnap.data(),
            technology: docSnap.data().technology || [], // Set default value if undefined
            steps: docSnap.data().steps || [], // Set default value if undefined
          } as Course;

          console.log("Fetched course data:", courseData); // Debugging: log course data
          setCourse(courseData);

          // Populate form fields with fetched data
          setTitle(courseData.title);
          setDescription(courseData.description);
          setPrice(courseData.price.toString());
          setCategory({
            label: courseData.category,
            value: courseData.category,
          });
          setTechnology(
            courseData.technology.map((tech) => ({
              label: tech,
              value: tech,
            }))
          );
          setMainVideoURL(courseData.mainVideoURL);
          setSteps(courseData.steps || []);
          setIsFree(courseData.price === 0);
        } else {
          setError("Course not found");
          console.error("Course not found for id:", id); // Debugging: log id error
        }
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching course:", err.message); // Debugging: log error message
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchCategoriesAndTechnologies = async () => {
      try {
        const categoriesSnapshot = await getDocs(
          collection(firestore, "categories")
        );
        setCategories(
          categoriesSnapshot.docs.map((doc) => ({
            label: doc.data().name,
            value: doc.data().name,
          }))
        );

        const technologiesSnapshot = await getDocs(
          collection(firestore, "technologies")
        );
        setTechnologies(
          technologiesSnapshot.docs.map((doc) => ({
            label: doc.data().name,
            value: doc.data().name,
          }))
        );
      } catch (fetchError: any) {
        console.error(
          "Error fetching categories/technologies:",
          fetchError.message
        ); // Debugging: log error message
      }
    };

    fetchCourse();
    fetchCategoriesAndTechnologies();
  }, [id]);

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    // Validate price if custom price is selected
    if (!isFree && Number(price) < 1) {
      setPriceError("Price must be at least 1 if it is not free.");
      return;
    }

    try {
      const docRef = doc(firestore, "courses", course.id);
      await updateDoc(docRef, {
        title: title || course.title,
        description: description || course.description,
        price: isFree ? 0 : Number(price) || course.price,
        category: category ? category.value : course.category,
        technology: technology.length
          ? technology.map((tech) => tech.value)
          : course.technology,
        mainVideoURL: mainVideoURL || course.mainVideoURL,
        steps: steps.length
          ? steps.map((step, index) => ({
              ...step,
              stepVideoURL:
                step.stepVideoURL || course.steps?.[index]?.stepVideoURL || "", // Use optional chaining here
            }))
          : course.steps,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      alert((error as any).message);
    }
  };

  const handleStepChange = (
    index: number,
    field: keyof Course["steps"][0],
    value: string
  ) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { title: "", description: "", stepVideoURL: "" }]);
  };

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Edit Course
        </h1>
        <form onSubmit={handleUpdateCourse}>
          {/* Course Title */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Title"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Description"
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Price
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="priceOption"
                value="free"
                checked={isFree}
                onChange={() => {
                  setIsFree(true);
                  setPriceError(null); // Reset price error if Free is selected
                }}
                className="mr-2"
              />
              <label className="mr-4">Free</label>
              <input
                type="radio"
                name="priceOption"
                value="custom"
                checked={!isFree}
                onChange={() => {
                  setIsFree(false);
                  setPriceError(null); // Reset price error for Custom Price
                }}
                className="mr-2"
              />
              <label>Custom Price</label>
            </div>
            {!isFree && (
              <>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Course Price"
                  min={1} // Enforce minimum price value
                />
                {priceError && (
                  <p className="text-red-500 text-sm mt-1">{priceError}</p>
                )}
              </>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Category
            </label>
            <Select
              value={category}
              onChange={(selected) => setCategory(selected)}
              options={categories}
              placeholder="Select Category"
              className="mt-1"
            />
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Technologies Used
            </label>
            <Select
              isMulti
              value={technology}
              onChange={(selected) => setTechnology(selected)}
              options={technologies}
              placeholder="Select Technologies"
              className="mt-1"
            />
          </div>

          {/* Main Video URL */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Main Video URL
            </label>
            <input
              type="text"
              value={mainVideoURL}
              onChange={(e) => setMainVideoURL(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Main Video URL"
            />
          </div>

          {/* Steps */}
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Steps
            </label>
            {steps.map((step, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
                <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Step Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(index, "title", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Title"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(index, "description", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Description"
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Step Video URL
                  </label>
                  <input
                    type="text"
                    value={step.stepVideoURL}
                    onChange={(e) =>
                      handleStepChange(index, "stepVideoURL", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Video URL"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Add Step
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none"
          >
            Update Course
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditCourse;
