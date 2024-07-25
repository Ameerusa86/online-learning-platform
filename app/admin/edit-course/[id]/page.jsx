// app/course/[id]/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore, doc, getDoc, setDoc } from "../../../utils/firebase";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Spinner } from "@/app/components/Spinner";

export default function CoursePage({ params }) {
  const { id } = params;
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stepCompleted, setStepCompleted] = useState({});
  const [selectedStep, setSelectedStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(firestore, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = { id: docSnap.id, ...docSnap.data() };
          console.log("Fetched course data:", courseData);
          setCourse(courseData);
        } else {
          setError("Course not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (course && auth.currentUser) {
        const user = auth.currentUser;
        const docRef = doc(firestore, "users", user.uid, "courses", course.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const progressData = docSnap.data().progress;
          setProgress(progressData);
          setStepCompleted(docSnap.data().stepCompleted || {});
        } else {
          await setDoc(docRef, { progress: 0, stepCompleted: {} });
          setProgress(0);
          setStepCompleted({});
        }
      }
    };

    fetchProgress();
  }, [course]);

  const updateProgress = async (stepIndex) => {
    const user = auth.currentUser;
    if (user && course) {
      const newStepCompleted = { ...stepCompleted, [stepIndex]: true };
      const newProgress =
        (Object.keys(newStepCompleted).length / course.steps.length) * 100;
      const docRef = doc(firestore, "users", user.uid, "courses", course.id);
      await setDoc(
        docRef,
        { progress: newProgress, stepCompleted: newStepCompleted },
        { merge: true }
      );
      setProgress(newProgress);
      setStepCompleted(newStepCompleted);
    }
  };

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

  // Extract video ID from the videoURL
  const extractVideoId = (url) => {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const pathname = urlObj.pathname.split("/");
    return params.get("v") || pathname[pathname.length - 1];
  };

  const stepVideoIds = course.steps
    ? course.steps.map((step) => extractVideoId(step.videoURL))
    : [];
  const stepVideoEmbedURLs = stepVideoIds.map(
    (id) => `https://www.youtube.com/embed/${id}`
  );

  return (
    <ProtectedRoute>
      <div className="flex max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <div className="w-1/4 p-4 border-r">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Course Steps
          </h2>
          {course.steps && course.steps.length > 0 && (
            <ul>
              {course.steps.map((step, index) => (
                <li
                  key={index}
                  className={`mb-2 cursor-pointer p-2 rounded-md ${
                    index === selectedStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                  onClick={() => setSelectedStep(index)}
                >
                  Step {index + 1}: {step.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-3xl font-bold mb-4 text-center text-black">
            {course.title}
          </h1>
          <p className="text-lg mb-4 text-black">{course.description}</p>
          {course.steps && course.steps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h2 className="text-xl font-semibold mb-2 text-black">
                Step {selectedStep + 1}: {course.steps[selectedStep].title}
              </h2>
              <p className="mb-2 text-black">
                {course.steps[selectedStep].description}
              </p>
              <iframe
                width="100%"
                height="400"
                src={stepVideoEmbedURLs[selectedStep]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => updateProgress(selectedStep)}
                className={`mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  stepCompleted[selectedStep]
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={stepCompleted[selectedStep]}
              >
                Mark as Completed
              </button>
            </motion.div>
          )}
          <div className="text-center mt-4">
            <p className="text-xl text-black">
              Progress: {progress.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
