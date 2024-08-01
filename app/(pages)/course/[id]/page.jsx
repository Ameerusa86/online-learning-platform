"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(firestore, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = { id: docSnap.id, ...docSnap.data() };
          console.log("Fetched course data:", courseData); // Log the course data
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
      const currentUser = auth.currentUser;
      setUser(currentUser);

      if (course && currentUser) {
        const docRef = doc(
          firestore,
          "users",
          currentUser.uid,
          "courses",
          course.id
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const progressData = docSnap.data().progress;
          setProgress(progressData);
          setStepCompleted(docSnap.data().stepCompleted || {});
          setHasAccess(true);
        } else {
          await setDoc(docRef, { progress: 0, stepCompleted: {} });
          setProgress(0);
          setStepCompleted({});
          setHasAccess(course.price === 0); // Grant access if course is free
        }
      }
    };

    fetchProgress();
  }, [course]);

  const toggleStepCompletion = async (stepIndex) => {
    if (!hasAccess && stepIndex > 0) {
      toast.error("Please purchase the course to access this content.");
      return;
    }

    const currentUser = auth.currentUser;
    if (currentUser && course) {
      const newStepCompleted = { ...stepCompleted };
      if (newStepCompleted[stepIndex]) {
        delete newStepCompleted[stepIndex];
      } else {
        newStepCompleted[stepIndex] = true;
      }
      const completedSteps =
        Object.keys(newStepCompleted).length - (newStepCompleted[0] ? 1 : 0);
      const totalSteps = course.steps.length;
      const newProgress = (completedSteps / totalSteps) * 100;
      const docRef = doc(
        firestore,
        "users",
        currentUser.uid,
        "courses",
        course.id
      );
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

  const stepVideoIds = course.steps
    ? course.steps
        .map((step) => extractVideoId(step.stepVideoURL))
        .filter(Boolean)
    : [];
  const stepVideoEmbedURLs = stepVideoIds.map(
    (id) => `https://www.youtube.com/embed/${id}`
  );

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center max-w-7xl mx-auto p-8 bg-gray-100 shadow-2xl rounded-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          {course.title}
        </h1>
        <p className="text-lg mb-4 text-center text-gray-800">
          {course.description}
        </p>
        <div className="flex w-full">
          <div className="w-1/4 p-4 border-r border-gray-300">
            <h2
              className="text-xl font-semibold mb-4 text-white bg-blue-500 p-2 rounded-xl
            shadow-md"
            >
              Course Steps
            </h2>
            <ul>
              <li
                className={`mb-2 cursor-pointer p-2 rounded-md ${
                  selectedStep === 0
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => setSelectedStep(0)}
              >
                Intro
              </li>
              {course.steps &&
                course.steps.length > 0 &&
                course.steps.map((step, index) => (
                  <li
                    key={index}
                    className={`mb-2 cursor-pointer p-2 rounded-md ${
                      selectedStep === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                    onClick={() => setSelectedStep(index + 1)}
                  >
                    Step {index + 1}: {step.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-3/4 p-4 flex flex-col items-center">
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
                <iframe
                  width="100%"
                  height="400"
                  src={mainVideoEmbedURL}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ) : (
              course.steps &&
              course.steps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 w-full"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Step {selectedStep}: {course.steps[selectedStep - 1].title}
                  </h2>
                  <p className="mb-2 text-gray-800">
                    {course.steps[selectedStep - 1].description}
                  </p>
                  {stepVideoEmbedURLs[selectedStep - 1] ? (
                    <iframe
                      width="100%"
                      height="400"
                      src={stepVideoEmbedURLs[selectedStep - 1]}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="bg-gray-100 p-6 text-center rounded-xl">
                      <p className="text-gray-800 font-bold">
                        No video available for this step.
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => toggleStepCompletion(selectedStep)}
                    className={`mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
                  >
                    {stepCompleted[selectedStep]
                      ? "Mark as Incomplete"
                      : "Mark as Completed"}
                  </button>
                </motion.div>
              )
            )}
          </div>
        </div>
        <div className="text-center mt-4 bg-blue-500 py-2 px-4 rounded-xl shadow-md ">
          <p className="text-xl text-white">
            Progress: {Math.floor(progress.toFixed(2))}%
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}