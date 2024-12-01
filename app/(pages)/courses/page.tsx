"use client";

import { useEffect, useState } from "react";
import { firestore, collection, getDocs } from "@/utils/firebase";
import { motion } from "framer-motion";
import CourseCard from "@/components/Cards/CourseCard";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  price: string | number;
  category: string;
  chaptersCount: number;
  slug: string;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string | number;
  author: string;
}

const CoursesAndTutorialsPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));
        const tutorialsSnapshot = await getDocs(
          collection(firestore, "tutorials")
        );

        // Fetch and structure courses
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "No Title",
          description: doc.data().description || "No description available",
          imageUrl:
            doc.data().imageUrl ||
            "https://via.placeholder.com/800x600.png?text=No+Image+Available",
          author: doc.data().author || "Unknown Author",
          price: doc.data().price || "Free",
          category: doc.data().category || "Uncategorized",
          chaptersCount: doc.data().chaptersCount || 0,
          slug: doc.data().slug || "no-slug",
        }));

        // Fetch and structure tutorials
        const tutorialsData = tutorialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "No Title",
          description: doc.data().description || "No description available",
          imageUrl:
            doc.data().imageUrl ||
            "https://via.placeholder.com/800x600.png?text=No+Image+Available",
          price: doc.data().price || "Free",
          author: doc.data().author || "Unknown Author",
        }));

        setCourses(coursesData);
        setTutorials(tutorialsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (courses.length === 0 && tutorials.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No courses or tutorials found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Courses and Tutorials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Render Courses */}
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
        {/* Render Tutorials */}
        {tutorials.map((tutorial) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="bg-gray-100 p-4 rounded shadow-md cursor-pointer hover:bg-gray-200 transition"
              onClick={() => router.push(`/tutorial/${tutorial.id}`)}
            >
              <div className="relative group">
                <img
                  src={
                    tutorial.imageUrl ||
                    "https://via.placeholder.com/800x600.png?text=No+Image+Available"
                  }
                  alt={tutorial.title}
                  className="w-full h-40 object-cover rounded-t"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                  {tutorial.price === "Free" || tutorial.price === 0
                    ? "Free"
                    : `$${tutorial.price}`}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-4">
                {tutorial.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {tutorial.description}
              </p>
              <Button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                onClick={() => router.push(`/tutorial/${tutorial.id}`)}
              >
                View Tutorial
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesAndTutorialsPage;
