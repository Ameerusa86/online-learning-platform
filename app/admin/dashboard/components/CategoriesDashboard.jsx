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

const CategoriesDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesSnapshot = await getDocs(
          collection(firestore, "categories")
        );
        setCategories(
          categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(firestore, "categories", id));
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Categories Dashboard
      </h1>

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
    </div>
  );
};

export default CategoriesDashboard;
