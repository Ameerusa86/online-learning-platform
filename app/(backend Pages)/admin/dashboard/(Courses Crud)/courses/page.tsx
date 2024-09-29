"use client";

import { useEffect, useState } from "react";
import {
  firestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "@/utils/firebase";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardLayout from "../../../DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the Course type
interface Course {
  id: string;
  title: string;
  author: string;
  price: number;
}

const CoursesDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Store selected course for deletion
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control modal state
  const router = useRouter();

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));
        setCourses(
          coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            price: doc.data().price,
          }))
        );
      } catch (error) {
        console.error("Error fetching courses:", (error as Error).message);
      }
    };

    fetchData();
  }, []);

  // Delete course
  const handleDeleteCourse = async () => {
    if (selectedCourse) {
      try {
        await deleteDoc(doc(firestore, "courses", selectedCourse.id));
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== selectedCourse.id)
        );
        setIsDialogOpen(false); // Close the modal after deletion
        setSelectedCourse(null); // Reset the selected course
      } catch (error) {
        console.error("Error deleting course:", (error as Error).message);
      }
    }
  };

  // Open modal to confirm deletion
  const openDeleteModal = (course: Course) => {
    setSelectedCourse(course); // Set the course to delete
    setIsDialogOpen(true); // Open the dialog
  };

  // Close the modal without deleting
  const closeDeleteModal = () => {
    setIsDialogOpen(false);
    setSelectedCourse(null); // Clear selected course
  };

  // Edit course
  const handleEditCourse = (course: Course) => {
    router.push(`/admin/dashboard/edit-course/${course.id}`);
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Courses Dashboard
        </h1>

        <div className="mb-6">
          <p className="text-lg text-gray-800">
            Total Courses: {courses.length}
          </p>
          <div className="flex space-x-4 mt-4">
            <Link
              href="/admin/dashboard/create-course"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Create Course
            </Link>
          </div>
        </div>

        {/* Table Structure */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Course Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{course.title}</td>
                <td className="border px-4 py-2">{course.author}</td>
                <td className="border px-4 py-2">${course.price}</td>
                <td className="border px-4 py-2 text-right">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-yellow-500 hover:text-yellow-600 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDeleteModal(course)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Shadcn Modal */}
        {selectedCourse && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the course "
                {selectedCourse.title}"? This action cannot be undone.
              </DialogDescription>
              <DialogFooter>
                <Button variant="ghost" onClick={closeDeleteModal}>
                  No, Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteCourse}>
                  Yes, Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoursesDashboard;
