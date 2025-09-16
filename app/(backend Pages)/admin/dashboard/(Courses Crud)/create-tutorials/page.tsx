"use client";

import React, { useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
import { firestore, collection, addDoc } from "@/utils/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ExplanationStep {
  title: string;
  description?: string; // Optional description
  codeSnippet: string;
}

const CreateTutorials: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("Free"); // Free or Paid
  const [price, setPrice] = useState<string>(""); // Custom price for Paid tutorials
  const [category, setCategory] = useState<string>(""); // Category of the tutorial
  const [image, setImage] = useState<File | null>(null); // Tutorial image
  const [explanations, setExplanations] = useState<ExplanationStep[]>([
    { title: "", codeSnippet: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const user = useAuth(); // Get the current user info
  const storage = getStorage(); // Firebase Storage instance

  const handleExplanationChange = (
    index: number,
    field: keyof ExplanationStep,
    value: string
  ) => {
    const updatedSteps = [...explanations];
    updatedSteps[index][field] = value;
    setExplanations(updatedSteps);
  };

  const addExplanationStep = () => {
    setExplanations([...explanations, { title: "", codeSnippet: "" }]);
  };

  const removeExplanationStep = (index: number) => {
    setExplanations(explanations.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      // Upload image if provided
      if (image) {
        const imageRef = ref(storage, `tutorials/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const tutorialData = {
        title,
        description,
        price: priceType === "Free" ? "Free" : `${price}`,
        category, // Include the selected category
        author: user?.name || "Anonymous", // Set the author to the logged-in user or Anonymous
        imageUrl, // Add the image URL
        explanations: explanations.filter(
          (step) => step.title.trim() && step.codeSnippet.trim()
        ),
      };

      await addDoc(collection(firestore, "tutorials"), tutorialData);

      setTitle("");
      setDescription("");
      setPriceType("Free");
      setPrice("");
      setCategory("");
      setImage(null);
      setExplanations([{ title: "", codeSnippet: "" }]);
      toast.success("Tutorial created successfully!");
      router.push("/admin/dashboard/tutorials");
    } catch (error) {
      console.error("Error creating tutorial:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Add Toaster component */}
        <Toaster position="top-right" reverseOrder={false} />

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create a New Tutorial
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tutorial Title */}
          <div>
            <label className="text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tutorial Title"
              className="mt-1 block w-full p-3 border rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tutorial Description"
              className="mt-1 block w-full p-3 border rounded"
              rows={4}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-3 border rounded"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Python">Python</option>
              <option value="Front End">Front End</option>
              <option value="Full Stack">Full Stack</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-lg font-medium text-gray-700">Price</label>
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="mt-1 block w-full p-3 border rounded"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
            {priceType === "Paid" && (
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price (in USD)"
                className="mt-3 block w-full p-3 border rounded"
                required={priceType === "Paid"}
              />
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-lg font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full p-3 border rounded"
              accept="image/*"
            />
          </div>

          {/* Explanation Steps */}
          {explanations.map((step, index) => (
            <div key={index} className="border p-4 rounded-md mb-4">
              <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
              <div>
                <label>Step Title</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    handleExplanationChange(index, "title", e.target.value)
                  }
                  placeholder="Step Title"
                  className="mt-1 block w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label>Step Description (Optional)</label>
                <textarea
                  value={step.description}
                  onChange={(e) =>
                    handleExplanationChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Step Description"
                  className="mt-1 block w-full p-3 border rounded"
                  rows={3}
                />
              </div>
              <div className="mt-4">
                <label>Step Code Snippet</label>
                <textarea
                  value={step.codeSnippet}
                  onChange={(e) =>
                    handleExplanationChange(
                      index,
                      "codeSnippet",
                      e.target.value
                    )
                  }
                  placeholder="Step Code Snippet"
                  className="mt-1 block w-full p-3 border rounded font-mono"
                  rows={5}
                  required
                />
              </div>
            </div>
          ))}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Submitting..." : "Create Tutorial"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateTutorials;
