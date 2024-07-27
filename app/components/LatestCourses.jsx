// components/LatestCourses.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { motion } from "framer-motion";
import Link from "next/link";

const LatestCourses = () => {
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
    <section className="py-20 bg-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Latest Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="border border-gray-600 p-4 rounded-lg shadow-lg bg-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-gray-800">
                {course.title}
              </h3>
              <p className="mt-2 text-gray-600">{course.description}</p>
              <Link
                className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                href={`/course/${course.id}`}
              >
                View Course
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCourses;
