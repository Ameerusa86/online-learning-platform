// app/admin/create-course/page.js
"use client";

import { useState } from "react";
import { firestore, collection, addDoc } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { motion } from "framer-motion";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [technology, setTechnology] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Add state for the image
  const [steps, setSteps] = useState([
    {
      title: "",
      description: "",
      category: "",
      technology: "",
      videoURL: "",
      price: "",
    },
  ]);
  const router = useRouter();
  const storage = getStorage(); // Initialize Firebase Storage

  const handleCourseCreation = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `courses/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    try {
      await addDoc(collection(firestore, "courses"), {
        title,
        description,
        category,
        technology,
        videoURLs: [videoURL],
        price,
        steps,
        imageUrl, // Save the image URL
      });
      router.push("/admin/dashboard");
    } catch (error) {
      alert(error.message);
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
        technology: "",
        videoURL: "",
        price: "",
      },
    ]);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create a New Course
        </h1>
        <form onSubmit={handleCourseCreation} className="space-y-6">
          <div>
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
            <label className="block text-lg font-medium text-gray-700">
              Course Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Course Category"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Technology Used
            </label>
            <input
              type="text"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              placeholder="Technology Used"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              YouTube Video URL
            </label>
            <input
              type="text"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              placeholder="YouTube Video URL"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Course Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Course Price"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Project Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-4 mb-2">Course Steps</h2>
            {steps.map((step, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
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
                  <input
                    type="text"
                    value={step.category}
                    onChange={(e) =>
                      handleStepChange(index, "category", e.target.value)
                    }
                    placeholder="Step Category"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Technology Used
                  </label>
                  <input
                    type="text"
                    value={step.technology}
                    onChange={(e) =>
                      handleStepChange(index, "technology", e.target.value)
                    }
                    placeholder="Technology Used"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Step YouTube Video URL
                  </label>
                  <input
                    type="text"
                    value={step.videoURL}
                    onChange={(e) =>
                      handleStepChange(index, "videoURL", e.target.value)
                    }
                    placeholder="Step YouTube Video URL"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Step Price
                  </label>
                  <input
                    type="number"
                    value={step.price}
                    onChange={(e) =>
                      handleStepChange(index, "price", e.target.value)
                    }
                    placeholder="Step Price"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
    </ProtectedRoute>
  );
}
