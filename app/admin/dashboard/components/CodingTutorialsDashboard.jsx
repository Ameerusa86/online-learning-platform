"use client";

import { useEffect, useState } from "react";
import {
  firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "@/utils/firebase";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const CodingTutorialsDashboard = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTechnology, setNewTechnology] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [steps, setSteps] = useState([{ title: "", codeSnippet: "" }]);
  const [technologies, setTechnologies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTutorial, setEditingTutorial] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorialsSnapshot = await getDocs(
          collection(firestore, "codingTutorials")
        );
        setTutorials(
          tutorialsSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              steps: data.steps || [], // Ensure steps is an array
            };
          })
        );

        const technologiesSnapshot = await getDocs(
          collection(firestore, "technologies")
        );
        setTechnologies(
          technologiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        const categoriesSnapshot = await getDocs(
          collection(firestore, "categories")
        );
        setCategories(
          categoriesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddTutorial = async () => {
    if (
      newTitle.trim() !== "" &&
      newDescription.trim() !== "" &&
      newCategory.trim() !== "" &&
      newTechnology.length > 0 &&
      newPrice.trim() !== "" &&
      steps.length > 0
    ) {
      try {
        const docRef = await addDoc(collection(firestore, "codingTutorials"), {
          title: newTitle,
          description: newDescription,
          category: newCategory,
          technology: newTechnology,
          price: newPrice,
          steps,
        });
        setTutorials([
          ...tutorials,
          {
            id: docRef.id,
            title: newTitle,
            description: newDescription,
            category: newCategory,
            technology: newTechnology,
            price: newPrice,
            steps,
          },
        ]);
        setNewTitle("");
        setNewDescription("");
        setNewCategory("");
        setNewTechnology([]);
        setNewPrice("");
        setSteps([{ title: "", codeSnippet: "" }]);
      } catch (error) {
        console.error("Error adding tutorial:", error.message);
      }
    }
  };

  const handleAddStep = () => {
    setSteps([...steps, { title: "", codeSnippet: "" }]);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const handleDeleteTutorial = async (id) => {
    try {
      await deleteDoc(doc(firestore, "codingTutorials", id));
      setTutorials(tutorials.filter((tutorial) => tutorial.id !== id));
    } catch (error) {
      console.error("Error deleting tutorial:", error.message);
    }
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleEditTutorial = (tutorial) => {
    setEditingTutorial(tutorial.id);
    setNewTitle(tutorial.title);
    setNewDescription(tutorial.description);
    setNewCategory(tutorial.category);
    setNewTechnology(tutorial.technology || []);
    setNewPrice(tutorial.price);
    setSteps(tutorial.steps);
  };

  const handleSaveEdit = async (id) => {
    try {
      const docRef = doc(firestore, "codingTutorials", id);
      await updateDoc(docRef, {
        title: newTitle,
        description: newDescription,
        category: newCategory,
        technology: newTechnology,
        price: newPrice,
        steps,
      });
      setTutorials((prevTutorials) =>
        prevTutorials.map((tutorial) =>
          tutorial.id === id
            ? {
                ...tutorial,
                title: newTitle,
                description: newDescription,
                category: newCategory,
                technology: newTechnology,
                price: newPrice,
                steps,
              }
            : tutorial
        )
      );
      setEditingTutorial(null);
      setNewTitle("");
      setNewDescription("");
      setNewCategory("");
      setNewTechnology([]);
      setNewPrice("");
      setSteps([{ title: "", codeSnippet: "" }]);
    } catch (error) {
      console.error("Error updating tutorial:", error.message);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Coding Tutorials Dashboard
      </h1>
      <div className="mb-6">
        <p className="text-lg text-gray-800">
          Total Tutorials: {tutorials.length}
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editingTutorial ? "Edit Tutorial" : "Add New Tutorial"}
        </h2>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 rounded mb-2"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded mb-2"
            rows="3"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            multiple
            value={newTechnology}
            onChange={(e) =>
              setNewTechnology(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="border p-2 rounded mb-2"
          >
            {technologies.map((technology) => (
              <option key={technology.id} value={technology.name}>
                {technology.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Price"
            className="border p-2 rounded mb-2"
          />
          <h3 className="text-lg font-bold mb-2">Steps</h3>
          {steps.map((step, index) => (
            <div key={index} className="mb-4 p-2 border rounded">
              <input
                type="text"
                value={step.title}
                onChange={(e) =>
                  handleStepChange(index, "title", e.target.value)
                }
                placeholder={`Step ${index + 1} Title`}
                className="border p-2 rounded mb-2 w-full"
              />
              <textarea
                value={step.codeSnippet}
                onChange={(e) =>
                  handleStepChange(index, "codeSnippet", e.target.value)
                }
                placeholder={`Step ${index + 1} Code Snippet`}
                className="border p-2 rounded mb-2 w-full"
                rows="4"
              />
              <button
                onClick={() => handleDeleteStep(index)}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddStep}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600 transition duration-300"
          >
            Add Step
          </button>
          <button
            onClick={
              editingTutorial
                ? () => handleSaveEdit(editingTutorial)
                : handleAddTutorial
            }
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            {editingTutorial ? "Save Changes" : "Add Tutorial"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="border border-gray-300 p-4 m-2 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {tutorial.title}
            </h2>
            <p className="text-gray-700">{tutorial.description}</p>
            <p className="text-gray-700">Category: {tutorial.category}</p>
            <p className="text-gray-700">
              Technologies:{" "}
              {Array.isArray(tutorial.technology)
                ? tutorial.technology.join(", ")
                : tutorial.technology}
            </p>
            <p className="text-gray-700">Price: ${tutorial.price}</p>
            {tutorial.steps && tutorial.steps.length > 0 ? (
              tutorial.steps.map((step, index) => (
                <div key={index} className="mt-2">
                  <h3 className="font-semibold text-gray-800">
                    Step {index + 1}: {step.title}
                  </h3>
                  <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                    <code>{step.codeSnippet}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No steps added yet.</p>
            )}
            <button
              onClick={() => handleEditTutorial(tutorial)}
              className="text-blue-500 mt-2 block hover:text-blue-600 transition duration-300"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDeleteTutorial(tutorial.id)}
              className="text-red-500 mt-2 block hover:text-red-600 transition duration-300"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingTutorialsDashboard;
