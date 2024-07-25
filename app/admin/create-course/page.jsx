// app/admin/create-course/page.js
"use client";

import { useState } from "react";
import { firestore, collection, addDoc } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { motion } from "framer-motion";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [videoURLs, setVideoURLs] = useState([""]);
  const router = useRouter();

  const handleCourseCreation = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "courses"), {
        title,
        description,
        price,
        videoURLs,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVideoURLChange = (index, value) => {
    const newVideoURLs = [...videoURLs];
    newVideoURLs[index] = value;
    setVideoURLs(newVideoURLs);
  };

  const addVideoURLField = () => {
    setVideoURLs([...videoURLs, ""]);
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
              YouTube Video URLs
            </label>
            {videoURLs.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => handleVideoURLChange(index, e.target.value)}
                placeholder="YouTube Video URL"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addVideoURLField}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add another video
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
