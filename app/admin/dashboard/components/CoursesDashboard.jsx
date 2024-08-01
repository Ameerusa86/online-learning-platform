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

const CoursesDashboard = () => {
  const [courses, setCourses] = useState([]);

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
          <div
            key={course.id}
            className="border border-gray-300 p-4 m-2 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-gray-700">Price: {course.price}</p>

            <div className="flex align-middle justify-between">
              {" "}
              <Link
                href={`/admin/edit-course/${course.id}`}
                className="text-blue-500 mt-2 block hover:text-blue-600 transition duration-300"
              >
                Edit Course
              </Link>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="text-red-500 mt-2 block hover:text-red-600 transition duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesDashboard;
