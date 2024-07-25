// app/course/[id]/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore, doc, getDoc, setDoc } from "../../../utils/firebase";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { Spinner } from "@/app/components/Spinner";

export default function CoursePage({ params }) {
  const { id } = params;
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      if (course && auth.currentUser) {
        const user = auth.currentUser;
        const docRef = doc(firestore, "users", user.uid, "courses", course.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProgress(docSnap.data().progress);
        } else {
          await setDoc(docRef, { progress: 0 });
          setProgress(0);
        }
      }
    };

    fetchProgress();
  }, [course]);

  const updateProgress = async (newProgress) => {
    const user = auth.currentUser;
    if (user && course) {
      const docRef = doc(firestore, "users", user.uid, "courses", course.id);
      await setDoc(docRef, { progress: newProgress }, { merge: true });
      setProgress(newProgress);
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

  const videoIds = course.videoURLs
    ? course.videoURLs.map((url) => extractVideoId(url))
    : [];
  const videoEmbedURLs = videoIds.map(
    (id) => `https://www.youtube.com/embed/${id}`
  );

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">{course.title}</h1>
        <p className="text-lg mb-4">{course.description}</p>
        {videoEmbedURLs.length > 0 ? (
          videoEmbedURLs.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h2 className="text-xl font-semibold mb-2">Step {index + 1}</h2>
              <iframe
                width="100%"
                height="400"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          ))
        ) : (
          <p className="text-red-500 text-center mb-4">
            Video URLs are not available.
          </p>
        )}
        <div className="text-center">
          <p className="text-xl mb-4">Progress: {progress}%</p>
          <button
            onClick={() => updateProgress(progress + 10)}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Increase Progress
          </button>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
