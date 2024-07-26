// app/admin/edit-course/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, firestore, getDoc, updateDoc } from "@/utils/firebase";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Spinner } from "@/app/components/Spinner";
import withAdminProtection from "../../dashboard/components/withAdminProtection";

const EditCourse = ({ params }) => {
  const { id } = params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(firestore, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = { id: docSnap.id, ...docSnap.data() };
          setCourse(courseData);
          setTitle(courseData.title);
          setDescription(courseData.description);
          setPrice(courseData.price);
          setCategory(courseData.category);
          setSteps(courseData.steps || []);
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

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firestore, "courses", id);
      await updateDoc(docRef, {
        title,
        description,
        price,
        category,
        steps,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { title: "", description: "", videoURL: "" }]);
  };

  const removeStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Edit Course</h1>
        <form onSubmit={handleUpdateCourse}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Category"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Steps
            </label>
            {steps.map((step, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Step Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(index, "title", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Title"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(index, "description", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Description"
                    required
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={step.videoURL}
                    onChange={(e) =>
                      handleStepChange(index, "videoURL", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Video URL"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Add Step
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none"
          >
            Update Course
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default withAdminProtection(EditCourse);
