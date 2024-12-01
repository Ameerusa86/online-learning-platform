"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
import {
  firestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "@/utils/firebase";
import Link from "next/link";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

// Define the Tutorial type
interface Tutorial {
  id: string;
  title: string;
  description: string;
  price: string | number;
  author: string;
}

const TutorialsPage: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(
    null
  );

  // Fetch tutorials from Firestore
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const tutorialsSnapshot = await getDocs(
          collection(firestore, "tutorials")
        );
        const tutorialsData = tutorialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          author: doc.data().author,
          price: doc.data().price,
          ...doc.data(),
        })) as Tutorial[];
        setTutorials(tutorialsData);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  // Handle tutorial deletion
  const handleDeleteTutorial = async () => {
    if (!selectedTutorial) return;

    try {
      await deleteDoc(doc(firestore, "tutorials", selectedTutorial.id));
      setTutorials((prevTutorials) =>
        prevTutorials.filter((tutorial) => tutorial.id !== selectedTutorial.id)
      );
      toast.success(
        `Tutorial "${selectedTutorial.title}" deleted successfully.`
      );
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      toast.error("Failed to delete the tutorial. Please try again.");
    } finally {
      setIsDialogOpen(false);
      setSelectedTutorial(null);
    }
  };

  // Open dialog to confirm deletion
  const openDeleteModal = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setIsDialogOpen(true);
  };

  // Close dialog without deleting
  const closeDeleteModal = () => {
    setIsDialogOpen(false);
    setSelectedTutorial(null);
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Tutorials Dashboard
        </h1>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-lg text-gray-800">
            Total Tutorials: {tutorials.length}
          </p>
          <Link
            href="/admin/dashboard/create-tutorials"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Tutorial
          </Link>
        </div>

        {isLoading ? (
          <p className="text-gray-600">Loading tutorials...</p>
        ) : tutorials.length === 0 ? (
          <p className="text-gray-600">No tutorials found.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left text-gray-800 font-semibold">
                  Tutorial Title
                </th>
                <th className="px-4 py-2 border text-left text-gray-800 font-semibold">
                  Author
                </th>
                <th className="px-4 py-2 border text-left text-gray-800 font-semibold">
                  Price
                </th>
                <th className="px-4 py-2 border text-center text-gray-800 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial) => (
                <tr
                  key={tutorial.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2 border text-gray-800">
                    {tutorial.title}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {tutorial.author || "Unknown"}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {tutorial.price === 0 || tutorial.price === "Free"
                      ? "Free"
                      : `$${tutorial.price}`}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center space-x-3">
                      {/* View Button */}
                      <Link
                        href={`/admin/dashboard/tutorials/${tutorial.id}`}
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        <FaEye className="mr-1" /> View
                      </Link>
                      {/* Edit Button */}
                      <Link
                        href={`/admin/dashboard/edit-tutorial/${tutorial.id}`}
                        className="text-yellow-500 hover:text-yellow-700 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Link>
                      {/* Delete Button */}
                      <button
                        onClick={() => openDeleteModal(tutorial)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Shadcn Modal for Deletion Confirmation */}
        {selectedTutorial && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p className="text-gray-600">
                Are you sure you want to delete the tutorial "
                <span className="font-semibold">{selectedTutorial.title}</span>
                "? This action cannot be undone.
              </p>
              <DialogFooter>
                <Button variant="ghost" onClick={closeDeleteModal}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteTutorial}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TutorialsPage;
