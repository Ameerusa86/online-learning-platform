"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Spinner2 from "@/components/spinner2";

export default function TutorialDetailsPage({ params }) {
  const { id } = params;
  const [tutorial, setTutorial] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stepCompleted, setStepCompleted] = useState({});
  const [selectedStep, setSelectedStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const docRef = doc(firestore, "tutorials", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tutorialData = { id: docSnap.id, ...docSnap.data() };
          setTutorial(tutorialData);
        } else {
          setError("Tutorial not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (tutorial && auth.currentUser) {
        const user = auth.currentUser;
        const docRef = doc(
          firestore,
          "users",
          user.uid,
          "courses",
          tutorial.id
        );
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
  }, [tutorial]);

  const toggleStepCompletion = async (stepIndex) => {
    const user = auth.currentUser;
    if (user && tutorial) {
      const newStepCompleted = { ...stepCompleted };
      if (newStepCompleted[stepIndex]) {
        delete newStepCompleted[stepIndex];
      } else {
        newStepCompleted[stepIndex] = true;
      }
      const completedSteps = Object.keys(newStepCompleted).length;
      const newProgress = (completedSteps / tutorial.steps.length) * 100;
      const docRef = doc(firestore, "users", user.uid, "courses", tutorial.id);
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
    return <Spinner2 />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!tutorial) {
    return (
      <div className="text-red-500 text-center mt-4">Tutorial not found</div>
    );
  }

  return (
    <div className="flex max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <div className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Tutorial Steps
        </h2>
        {tutorial.steps && tutorial.steps.length > 0 && (
          <ul>
            {tutorial.steps.map((step, index) => (
              <li
                key={index}
                className={`mb-2 cursor-pointer p-2 rounded-md ${
                  index === selectedStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
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
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          {tutorial.title}
        </h1>
        <p className="text-lg mb-4 text-gray-800">{tutorial.description}</p>
        {tutorial.steps && tutorial.steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Step {selectedStep + 1}: {tutorial.steps[selectedStep].title}
            </h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>{tutorial.steps[selectedStep].codeSnippet}</code>
            </pre>
            <button
              onClick={() => toggleStepCompletion(selectedStep)}
              className={`mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            >
              {stepCompleted[selectedStep]
                ? "Mark as Incomplete"
                : "Mark as Completed"}
            </button>
          </motion.div>
        )}
        <div className="text-center mt-4">
          <p className="text-xl text-gray-800">
            Progress: {progress.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
