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
import DashboardCard from "./DashboardCard";
import { useRouter } from "next/navigation";

const CoursesDashboard = () => {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));
        setCourses(
          coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCourse = async (id) => {
    try {
      await deleteDoc(doc(firestore, "courses", id));
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const handleEditCourse = (course) => {
    router.push(`/admin/edit-course/${course.id}`);
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
          <DashboardCard
            key={course.id}
            item={course}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesDashboard;
