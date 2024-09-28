"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "@/components/Cards/CourseCard";
import { collection, firestore, getDocs } from "@/utils/firebase";
import Spinner from "./spinner";

interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  price: string;
  imageUrl: string;
  category: string;
  chaptersCount: number;
  slug: string;
}

const LatestCourses = ({ limit = 5 }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));

        setCourses(
          coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Course[]
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-wrap items-center p-8 bg-gray-900">
      <motion.h1
        className="text-5xl font-extrabold leading-tight text-white mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Latest Courses
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default LatestCourses;
