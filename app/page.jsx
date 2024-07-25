// app/page.js
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import Footer from "./components/Footer";

export default function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(firestore, "courses"));
      setCourses(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-4"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Available Courses
        </h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.2,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
