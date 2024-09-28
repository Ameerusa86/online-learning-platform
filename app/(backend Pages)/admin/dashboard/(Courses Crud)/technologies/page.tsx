"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
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

// Define the Technology type
interface Technology {
  id: string;
  name: string;
}

const Technologies: React.FC = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [newTechnology, setNewTechnology] = useState<string>("");
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(
    null
  );
  const [editTechnologyName, setEditTechnologyName] = useState<string>("");

  // Fetch data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const technologiesSnapshot = await getDocs(
          collection(firestore, "technologies")
        );
        const fetchedTechnologies: Technology[] = technologiesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            name: doc.data().name,
          })
        );
        setTechnologies(fetchedTechnologies);
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }
    };

    fetchData();
  }, []);

  // Add new technology
  const handleAddTechnology = async () => {
    if (newTechnology.trim() !== "") {
      try {
        const docRef = await addDoc(collection(firestore, "technologies"), {
          name: newTechnology,
        });
        setTechnologies((prev) => [
          ...prev,
          { id: docRef.id, name: newTechnology },
        ]);
        setNewTechnology("");
      } catch (error) {
        console.error("Error adding technology:", (error as Error).message);
      }
    }
  };

  // Edit existing technology
  const handleEditTechnology = async () => {
    if (editingTechnology && editTechnologyName.trim() !== "") {
      try {
        const technologyRef = doc(
          firestore,
          "technologies",
          editingTechnology.id
        );
        await updateDoc(technologyRef, { name: editTechnologyName });

        setTechnologies((prev) =>
          prev.map((technology) =>
            technology.id === editingTechnology.id
              ? { ...technology, name: editTechnologyName }
              : technology
          )
        );
        setEditingTechnology(null);
        setEditTechnologyName("");
      } catch (error) {
        console.error("Error editing technology:", (error as Error).message);
      }
    }
  };

  // Delete technology
  const handleDeleteTechnology = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "technologies", id));
      setTechnologies((prev) =>
        prev.filter((technology) => technology.id !== id)
      );
    } catch (error) {
      console.error("Error deleting technology:", (error as Error).message);
    }
  };

  const handleStartEditing = (technology: Technology) => {
    setEditingTechnology(technology);
    setEditTechnologyName(technology.name);
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Technologies Dashboard
        </h1>

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
              className="border p-2 rounded mr-2 w-full sm:w-1/2"
            />
            <button
              onClick={handleAddTechnology}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              Add Technology
            </button>
          </div>

          {editingTechnology && (
            <div className="flex mb-4">
              <input
                type="text"
                value={editTechnologyName}
                onChange={(e) => setEditTechnologyName(e.target.value)}
                placeholder="Edit Technology Name"
                className="border p-2 rounded mr-2 w-full sm:w-1/2"
              />
              <button
                onClick={handleEditTechnology}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingTechnology(null)}
                className="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}

          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Technology Name</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {technologies.map((technology) => (
                <tr key={technology.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{technology.name}</td>
                  <td className="border px-4 py-2 text-right">
                    <button
                      onClick={() => handleStartEditing(technology)}
                      className="text-yellow-500 hover:text-yellow-600 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTechnology(technology.id)}
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

export default Technologies;
