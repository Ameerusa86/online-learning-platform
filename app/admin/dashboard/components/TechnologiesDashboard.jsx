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

const TechnologiesDashboard = () => {
  const [technologies, setTechnologies] = useState([]);
  const [newTechnology, setNewTechnology] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
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

export default TechnologiesDashboard;
