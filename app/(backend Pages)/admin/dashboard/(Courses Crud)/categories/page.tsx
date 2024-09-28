"use client";

import { useEffect, useState } from "react";
import {
  firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "@/utils/firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
import React from "react";
import DashboardLayout from "../../../DashboardLayout";

// Define the Category type
interface Category {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCategoryName, setEditCategoryName] = useState<string>("");

  // Fetch data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesSnapshot = await getDocs(
          collection(firestore, "categories")
        );
        const fetchedCategories: Category[] = categoriesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            name: doc.data().name,
          })
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }
    };

    fetchData();
  }, []);

  // Add new category
  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        const docRef = await addDoc(collection(firestore, "categories"), {
          name: newCategory,
        });
        setCategories((prev) => [
          ...prev,
          { id: docRef.id, name: newCategory },
        ]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", (error as Error).message);
      }
    }
  };

  // Edit existing category
  const handleEditCategory = async () => {
    if (editingCategory && editCategoryName.trim() !== "") {
      try {
        const categoryRef = doc(firestore, "categories", editingCategory.id);
        await updateDoc(categoryRef, { name: editCategoryName });

        setCategories((prev) =>
          prev.map((category) =>
            category.id === editingCategory.id
              ? { ...category, name: editCategoryName }
              : category
          )
        );
        setEditingCategory(null);
        setEditCategoryName("");
      } catch (error) {
        console.error("Error editing category:", (error as Error).message);
      }
    }
  };

  // Delete category
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "categories", id));
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", (error as Error).message);
    }
  };

  const handleStartEditing = (category: Category) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  return (
    <DashboardLayout>
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
              className="border p-2 rounded mr-2 w-full sm:w-1/2"
            />
            <button
              onClick={handleAddCategory}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              Add Category
            </button>
          </div>

          {editingCategory && (
            <div className="flex mb-4">
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                placeholder="Edit Category Name"
                className="border p-2 rounded mr-2 w-full sm:w-1/2"
              />
              <button
                onClick={handleEditCategory}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}

          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2 text-right">
                    <button
                      onClick={() => handleStartEditing(category)}
                      className="text-yellow-500 hover:text-yellow-600 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
