"use client";

import { useState, useEffect } from "react";
import {
  firestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
} from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/app/hooks/useAuth";
import { motion } from "framer-motion";
import Select from "react-select";
import withAdminProtection from "@/app/admin/dashboard/components/withAdminProtection";
import toast from "react-hot-toast";
import { Spinner } from "@/app/components/Spinner";

const CreateTutorial = () => {
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("Free");
  const [image, setImage] = useState(null);
  const [mainVideoURL, setMainVideoURL] = useState("");
  const [steps, setSteps] = useState([
    {
      title: "",
      description: "",
      category: "",
      technology: [],
      codeSnippet: "",
    },
  ]);
  const router = useRouter();
  const storage = getStorage();

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin);
        }
      }
    };

    const fetchCategoriesAndTechnologies = async () => {
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
    };

    if (user) {
      checkAdmin();
      fetchCategoriesAndTechnologies();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [isLoading, user, router]);

  const handleTutorialCreation = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error("You do not have permission to create a tutorial.");
      return;
    }

    let imageUrl = "";
    if (image) {
      try {
        const imageRef = ref(storage, `tutorials/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Image Upload Error:", error);
        toast.error(
          "There was an issue uploading the image. Please try again."
        );
        return;
      }
    }

    try {
      await addDoc(collection(firestore, "tutorials"), {
        title,
        description,
        category: category ? category.value : "",
        technology: technology.map((tech) => tech.value),
        mainVideoURL,
        price: priceType === "Free" ? "Free" : price,
        steps: steps.map((step) => ({ ...step })),
        imageUrl,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Firestore AddDoc Error:", error);
      toast.error(
        "There was an issue creating the tutorial. Please try again."
      );
    }
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const addStepField = () => {
    setSteps([
      ...steps,
      {
        title: "",
        description: "",
        category: "",
        technology: [],
        codeSnippet: "",
      },
    ]);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePriceTypeChange = (selectedOption) => {
    setPriceType(selectedOption.value);
    if (selectedOption.value === "Free") {
      setPrice("");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create a New Tutorial
      </h1>
      <form onSubmit={handleTutorialCreation} className="space-y-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-lg font-medium text-gray-700">
              Tutorial Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tutorial Title"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-lg font-medium text-gray-700">
              Tutorial Category
            </label>
            <Select
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="Select Category"
              className="mt-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-lg font-medium text-gray-700">
              Technologies Used
            </label>
            <Select
              isMulti
              value={technology}
              onChange={setTechnology}
              options={technologies}
              placeholder="Select Technologies"
              className="mt-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
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
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-lg font-medium text-gray-700">
              Tutorial Price
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
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            )}
          </div>
          <div className="w-full md:w-1/2 px-4">
            <label className="block text-lg font-medium text-gray-700">
              Project Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
        </div>
        <div className="px-4">
          <label className="block text-lg font-medium text-gray-700">
            Tutorial Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course Description"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            rows={4}
          />
        </div>
        <div className="px-4">
          <h2 className="text-2xl font-bold mt-4 mb-2">Course Steps</h2>
          {steps.map((step, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 bg-gray-100">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Step {index + 1}
              </h3>
              <div>
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
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Step Description
                </label>
                <textarea
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(index, "description", e.target.value)
                  }
                  placeholder="Step Description"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Step Category
                </label>
                <Select
                  value={categories.find((cat) => cat.value === step.category)}
                  onChange={(selectedOption) =>
                    handleStepChange(index, "category", selectedOption.value)
                  }
                  options={categories}
                  placeholder="Select Category"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Technologies Used
                </label>
                <Select
                  isMulti
                  value={step.technology.map((tech) =>
                    technologies.find((t) => t.value === tech)
                  )}
                  onChange={(selectedOptions) =>
                    handleStepChange(
                      index,
                      "technology",
                      selectedOptions.map((opt) => opt.value)
                    )
                  }
                  options={technologies}
                  placeholder="Select Technologies"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Step Code Snippet
                </label>
                <textarea
                  value={step.codeSnippet}
                  onChange={(e) =>
                    handleStepChange(index, "codeSnippet", e.target.value)
                  }
                  placeholder="Step Code Snippet"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  rows={4}
                />
              </div>
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
        <div className="text-center px-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Tutorial
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default withAdminProtection(CreateTutorial);
