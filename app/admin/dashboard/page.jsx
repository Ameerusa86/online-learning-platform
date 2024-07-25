// app/admin/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { firestore, collection, getDocs } from "../../../utils/firebase";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "courses"));
        setCourses(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-4 m-2 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
