"use client";

import { useState, useEffect } from "react";
import { auth, firestore } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Spinner from "@/components/spinner";

// Define types for course and params
interface Course {
  id: string;
  title: string;
  description: string;
  mainVideoURL: string;
  price: number;
  steps: {
    title: string;
    stepVideoURL: string;
    description?: string;
  }[];
}

interface Params {
  params: {
    slug: string;
  };
}

const CoursePage: React.FC<Params> = ({ params }) => {
  const { slug } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const coursesRef = collection(firestore, "courses");
        const q = query(coursesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const courseData = { id: doc.id, ...doc.data() } as Course;
          setCourse(courseData);
        } else {
          setError("Course not found");
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!course) {
    return (
      <div className="text-red-500 text-center mt-4">Course not found</div>
    );
  }

  const extractVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const pathname = urlObj.pathname.split("/");
      return params.get("v") || pathname[pathname.length - 1];
    } catch (error) {
      console.error("Invalid URL:", url);
      return null;
    }
  };

  const mainVideoId = extractVideoId(course.mainVideoURL);
  const mainVideoEmbedURL = `https://www.youtube.com/embed/${mainVideoId}`;

  return (
    <div className="min-h-screen flex items-center">
      {/* Main Content */}
      <div className="flex-grow w-screen">
        <div className="mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            {course.title}
          </h1>
          <p className="text-lg mb-6 text-center text-gray-800">
            {course.description}
          </p>

          <div className="flex flex-col md:flex-row">
            {/* Redesigned Sidebar */}
            <div className="w-full h-screen md:w-1/4 p-4 border-r border-gray-300 bg-white shadow-lg rounded-md md:sticky md:top-0 md:left-0">
              <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-3 rounded-lg shadow-md text-center">
                Course Steps
              </h2>
              <ul className="space-y-2">
                <li
                  className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
                    selectedStep === 0
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedStep(0)}
                >
                  Intro
                </li>
                {course.steps.map((step, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
                      selectedStep === index + 1
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedStep(index + 1)}
                  >
                    Step {index + 1}: {step.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Video and Step Video */}
            <div className="w-full md:w-3/4 p-4 flex flex-col items-center">
              {selectedStep === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 w-full"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Intro
                  </h2>
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src={mainVideoEmbedURL}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 w-full"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Step {selectedStep}: {course.steps[selectedStep - 1].title}
                  </h2>
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src={`https://www.youtube.com/embed/${extractVideoId(
                        course.steps[selectedStep - 1].stepVideoURL
                      )}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
