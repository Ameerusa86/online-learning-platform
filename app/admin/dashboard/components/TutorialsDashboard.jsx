"use client";

import { useState, useEffect } from "react";
import {
  firestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "@/utils/firebase";
import { FaTrash, FaEdit, FaSave, FaPlus } from "react-icons/fa";
import Link from "next/link";
import DashboardCard from "./DashboardCard";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TutorialsDashboard = () => {
  const [tutorials, setTutorials] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorialsSnapshot = await getDocs(
          collection(firestore, "tutorials")
        );
        setTutorials(
          tutorialsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTutorial = async (id) => {
    try {
      await deleteDoc(doc(firestore, "tutorials", id));
      setTutorials(tutorials.filter((tutorial) => tutorial.id !== id));
    } catch (error) {
      console.error("Error deleting tutorial:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleEditTutorial = (tutorial) => {
    router.push(`/admin/edit-tutorial/${tutorial.id}`);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Coding Tutorials Dashboard
      </h1>
      <div className="mb-6">
        <p className="text-lg text-gray-800">
          Total Tutorials: {tutorials.length}
        </p>
        <div className="flex space-x-4 mt-4">
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            href={"/admin/create-tutorial"}
          >
            Create a tutorial
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tutorials.map((tutorial) => (
          <DashboardCard
            key={tutorial.id}
            item={tutorial}
            onEdit={handleEditTutorial}
            onDelete={handleDeleteTutorial}
          />
        ))}
      </div>
    </div>
  );
};

export default TutorialsDashboard;
