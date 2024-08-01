"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  firestore,
} from "@/utils/firebase";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Spinner } from "@/app/components/Spinner";
import Select from "react-select";
import withAdminProtection from "../../dashboard/components/withAdminProtection";

const EditTutorial = ({ params }) => {
  const { id } = params;
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [mainVideoURL, setMainVideoURL] = useState("");
  const [steps, setSteps] = useState([]);
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const docRef = doc(firestore, "tutorials", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tutorialData = { id: docSnap.id, ...docSnap.data() };
          console.log("Fetched Tutorial Data:", tutorialData);
          setTutorial(tutorialData);
          setTitle(tutorialData.title);
          setDescription(tutorialData.description);
          setPrice(tutorialData.price);
          setCategory({
            label: tutorialData.category,
            value: tutorialData.category,
          });
          setTechnology(
            tutorialData.technology.map((tech) => ({
              label: tech,
              value: tech,
            }))
          );
          setMainVideoURL(tutorialData.mainVideoURL || "");
          setSteps(tutorialData.steps || []);
          setIsFree(tutorialData.price === 0);
        } else {
          setError("Tutorial not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchCategoriesAndTechnologies = async () => {
      const categoriesSnapshot = await getDocs(
        collection(firestore, "categories")
      );
      setCategories(
        categoriesSnapshot.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.data().name,
        }))
      );

      const technologiesSnapshot = await getDocs(
        collection(firestore, "technologies")
      );
      setTechnologies(
        technologiesSnapshot.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.data().name,
        }))
      );
    };

    fetchTutorial();
    fetchCategoriesAndTechnologies();
  }, [id]);

  const handleUpdateTutorial = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firestore, "tutorials", id);
      await updateDoc(docRef, {
        title: title || tutorial.title,
        description: description || tutorial.description,
        price: isFree ? 0 : price || tutorial.price,
        category: category ? category.value : tutorial.category,
        technology: technology.length
          ? technology.map((tech) => tech.value)
          : tutorial.technology,
        mainVideoURL: mainVideoURL || tutorial.mainVideoURL,
        steps: steps.length
          ? steps.map((step) => ({
              ...step,
              codeSnippet:
                step.codeSnippet ||
                tutorial.steps.find((s, i) => i === steps.indexOf(step))
                  .codeSnippet,
            }))
          : tutorial.steps,
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
    setSteps([...steps, { title: "", codeSnippet: "" }]);
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
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Edit Tutorial
        </h1>
        <form onSubmit={handleUpdateTutorial}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Tutorial Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tutorial Title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tutorial Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Price
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="priceOption"
                value="free"
                checked={isFree}
                onChange={() => setIsFree(true)}
                className="mr-2"
              />
              <label className="mr-4">Free</label>
              <input
                type="radio"
                name="priceOption"
                value="custom"
                checked={!isFree}
                onChange={() => setIsFree(false)}
                className="mr-2"
              />
              <label>Custom Price</label>
            </div>
            {!isFree && (
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Tutorial Price"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Category
            </label>
            <Select
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="Select Category"
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Technologies Used
            </label>
            <Select
              isMulti
              value={technology}
              onChange={setTechnology}
              options={technologies}
              placeholder="Select Technologies"
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Main Video URL
            </label>
            <input
              type="text"
              value={mainVideoURL}
              onChange={(e) => setMainVideoURL(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Main Video URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Steps
            </label>
            {steps.map((step, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
                <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
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
                  />
                </div>
                {/* <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(index, "description", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Description"
                  ></textarea>
                </div> */}
                {/* <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Step Video URL
                  </label>
                  <input
                    type="text"
                    value={step.stepVideoURL}
                    onChange={(e) =>
                      handleStepChange(index, "stepVideoURL", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Step Video URL"
                  />
                </div> */}
                <div className="mb-2">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Code Snippet
                  </label>
                  <textarea
                    value={step.codeSnippet}
                    onChange={(e) =>
                      handleStepChange(index, "codeSnippet", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Code Snippet"
                  ></textarea>
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
            Update Tutorial
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default withAdminProtection(EditTutorial);
