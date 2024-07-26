"use client";

import { useEffect, useState } from "react";
import {
  firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const router = useRouter();

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
        await addDoc(collection(firestore, "categories"), {
          name: newCategory,
        });
        setCategories([...categories, { name: newCategory }]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error.message);
      }
    }
  };

  const handleAddTechnology = async () => {
    if (newTechnology.trim() !== "") {
      try {
        await addDoc(collection(firestore, "technologies"), {
          name: newTechnology,
        });
        setTechnologies([...technologies, { name: newTechnology }]);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="mb-6">
          <p className="text-lg">Total Courses: {courses.length}</p>
          <div className="flex space-x-4 mt-4">
            <Link
              href="/admin/create-course"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Course
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-4 m-2 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p>{course.description}</p>
              <Link
                href={`/admin/edit-course/${course.id}`}
                className="text-blue-500 mt-2 block"
              >
                Edit Course
              </Link>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
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
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Category
            </button>
          </div>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center mb-2"
              >
                {category.name}
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Manage Technologies</h2>
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
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Technology
            </button>
          </div>
          <ul>
            {technologies.map((technology) => (
              <li
                key={technology.id}
                className="flex justify-between items-center mb-2"
              >
                {technology.name}
                <button
                  onClick={() => handleDeleteTechnology(technology.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
