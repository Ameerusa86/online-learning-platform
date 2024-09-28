"use client";

import { useEffect, useState } from "react";
import { firestore, collection, getDocs } from "@/utils/firebase";
import { motion } from "framer-motion";
import CourseCard from "@/components/Cards/CourseCard";
import Spinner from "@/components/spinner";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));
        const tutorialsSnapshot = await getDocs(
          collection(firestore, "tutorials")
        );

        setCourses(
          coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        setTutorials(
          tutorialsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Courses and Tutorials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
        {tutorials.map((tutorial) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <TutorialCard tutorial={tutorial} /> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
