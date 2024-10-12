"use client";

import { useState, useEffect } from "react";
import { firestore } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Spinner from "@/components/spinner";
import Highlight from "@/components/ui/highlight";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  description: string;
  mainVideoURL?: string;
  price: number;
  steps: {
    title: string;
    stepVideoURL?: string;
    description?: string;
    code?: string;
  }[];
  slug: string;
}

interface Params {
  params: {
    slug: string;
  };
}

const CoursePage: React.FC<Params> = ({ params }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null); // null for intro
  const [showCode, setShowCode] = useState<Record<number, boolean>>({});

  // State to track step completion
  const [stepsCompletion, setStepsCompletion] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const q = query(
          collection(firestore, "courses"),
          where("slug", "==", params.slug)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const courseData = querySnapshot.docs[0].data() as Course;
          setCourse(courseData);
          setStepsCompletion(new Array(courseData.steps.length).fill(false)); // Initialize completion status for steps
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError("An error occurred while fetching the course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.slug]);

  const extractVideoId = (url?: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleStepClick = (index: number | null) => {
    setSelectedStep(index);
  };

  const handleCodeToggle = (stepIndex: number) => {
    setShowCode((prevState) => ({
      ...prevState,
      [stepIndex]: !prevState[stepIndex],
    }));
  };

  const handleComplete = (index: number) => {
    setStepsCompletion((prevCompletion) =>
      prevCompletion.map((completed, i) => (i === index ? true : completed))
    );
  };

  const progressPercentage =
    (stepsCompletion.filter((completed) => completed).length /
      stepsCompletion.length) *
    100;

  if (loading) {
    return <Spinner />;
  }

  if (error || !course) {
    return (
      <div className="text-red-500 text-center mt-4">
        {error || "Course not found"}
      </div>
    );
  }

  const mainVideoId = extractVideoId(course.mainVideoURL);
  const mainVideoEmbedURL = mainVideoId
    ? `https://www.youtube.com/embed/${mainVideoId}`
    : "";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar (Steps) */}
      <div className="w-full lg:w-1/4 bg-white p-6 border-r border-gray-200 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {course.title}
        </h2>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-3 bg-gray-200" />
          <p className="text-sm text-gray-600 mt-2">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>

        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedStep === null
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleStepClick(null)}
            >
              Introduction
            </button>
          </li>
          {course.steps.map((step, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedStep === index
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleStepClick(index)}
              >
                Step {index + 1}: {step.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content (Video and Course Details) */}
      <div className="flex-grow p-6 lg:overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {course.title}
        </h1>
        <p className="text-lg mb-6 text-gray-600">{course.description}</p>

        <div className="mt-8 rounded-lg overflow-hidden">
          {/* Reduced video size */}
          {selectedStep === null && mainVideoEmbedURL && (
            <div className="relative w-full h-0 pb-[40%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-md"
                src={mainVideoEmbedURL}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Main Video"
              ></iframe>
            </div>
          )}
          {selectedStep !== null &&
            course.steps[selectedStep]?.stepVideoURL && (
              <div className="relative w-full h-0 pb-[40%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${extractVideoId(
                    course.steps[selectedStep]?.stepVideoURL
                  )}`}
                  title={`Step ${selectedStep + 1} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
        </div>

        {/* Display title and completion button under the video */}
        {selectedStep !== null && (
          <div className="mt-6 p-4 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {course.steps[selectedStep]?.title}
              </h2>
              <button
                disabled={stepsCompletion[selectedStep]}
                className={`${
                  stepsCompletion[selectedStep]
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-lg px-4 py-2`}
                onClick={() => handleComplete(selectedStep)}
              >
                {stepsCompletion[selectedStep] ? "Completed" : "Complete Step"}
              </button>
            </div>

            {/* Display description and code for the selected step */}
            <div className="prose max-w-none mt-4">
              {course.steps[selectedStep]?.description}
            </div>
            {course.steps[selectedStep]?.code && (
              <div className="mt-4">
                <button
                  onClick={() => handleCodeToggle(selectedStep)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  {showCode[selectedStep] ? "Hide Code" : "Show Code"}
                </button>

                {showCode[selectedStep] && (
                  <Highlight
                    code={course.steps[selectedStep]?.code || ""}
                    language="javascript"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
