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

// Define the Course type
interface Course {
  id: string;
  title: string;
  author: string;
  price: number;
}

const CoursesDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
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
  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "courses", id));
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );
    } catch (error) {
      console.error("Error deleting course:", (error as Error).message);
    }
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
                    onClick={() => handleDeleteCourse(course.id)}
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
    </DashboardLayout>
  );
};

export default CoursesDashboard;
