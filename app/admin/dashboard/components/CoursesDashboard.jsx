"use client";

import { useEffect, useState } from "react";
import {
  firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "@/utils/firebase";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const CoursesDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));
        setCourses(
          coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const categoriesSnapshot = await getDocs(
          collection(firestore, "categories")
        );
        setCategories(
          categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const technologiesSnapshot = await getDocs(
          collection(firestore, "technologies")
        );
        setTechnologies(
          technologiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        const docRef = await addDoc(collection(firestore, "categories"), {
          name: newCategory,
        });
        setCategories([...categories, { id: docRef.id, name: newCategory }]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error.message);
      }
    }
  };

  const handleAddTechnology = async () => {
    if (newTechnology.trim() !== "") {
      try {
        const docRef = await addDoc(collection(firestore, "technologies"), {
          name: newTechnology,
        });
        setTechnologies([
          ...technologies,
          { id: docRef.id, name: newTechnology },
        ]);
        setNewTechnology("");
      } catch (error) {
        console.error("Error adding technology:", error.message);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(firestore, "categories", id));
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const handleDeleteTechnology = async (id) => {
    try {
      await deleteDoc(doc(firestore, "technologies", id));
      setTechnologies(
        technologies.filter((technology) => technology.id !== id)
      );
    } catch (error) {
      console.error("Error deleting technology:", error.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteDoc(doc(firestore, "courses", id));
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Courses Dashboard
      </h1>
      <div className="mb-6">
        <p className="text-lg text-gray-800">Total Courses: {courses.length}</p>
        <div className="flex space-x-4 mt-4">
          <Link
            href="/admin/create-course"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Course
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-300 p-4 m-2 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>

            <div className="flex align-middle justify-between">
              {" "}
              <Link
                href={`/admin/edit-course/${course.id}`}
                className="text-blue-500 mt-2 block hover:text-blue-600 transition duration-300"
              >
                Edit Course
              </Link>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="text-red-500 mt-2 block hover:text-red-600 transition duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Manage Categories
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add Category
          </button>
        </div>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="w-96 flex justify-between items-center mb-2 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="ml-2 text-red-500 hover:text-red-600 transition duration-300"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Manage Technologies
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
            placeholder="New Technology"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleAddTechnology}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add Technology
          </button>
        </div>
        <ul>
          {technologies.map((technology) => (
            <li
              key={technology.id}
              className="w-96 hover:bg-gray-100 p-2 rounded flex justify-between items-center mb-2 text-gray-800"
            >
              <span>{technology.name}</span>
              <button
                onClick={() => handleDeleteTechnology(technology.id)}
                className="ml-2 text-red-500 hover:text-red-600 transition duration-300"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursesDashboard;
