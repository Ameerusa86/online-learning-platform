"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { firestore } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import DashboardLayout from "./../../../../DashboardLayout";

// Define the Explanation Step type
interface ExplanationStep {
  title: string;
  description: string;
  codeSnippet: string;
}

// Define the Tutorial type
interface Tutorial {
  id: string;
  title: string;
  explanation: ExplanationStep[];
}

const TutorialDetails: React.FC = () => {
  const params = useParams(); // Get the tutorial ID from the URL
  const router = useRouter();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTutorial = async () => {
      const id = typeof params.id === "string" ? params.id : params.id?.[0];
      console.log("Fetched ID from params:", id); // Log the fetched ID

      if (!id) {
        alert("Tutorial ID is missing!");
        router.push("/admin/dashboard/tutorials");
        return;
      }

      try {
        const docRef = doc(firestore, "tutorials", id);
        console.log("Document reference created:", docRef);

        const docSnapshot = await getDoc(docRef);
        console.log("Document snapshot exists:", docSnapshot.exists());
        console.log("Document snapshot data:", docSnapshot.data());

        if (docSnapshot.exists()) {
          const tutorialData = docSnapshot.data();
          setTutorial({
            id: docSnapshot.id,
            title: tutorialData.title,
            explanation: tutorialData.explanations || [], // Ensure `explanations` exists
          });
        } else {
          alert("Tutorial not found in Firestore!");
          router.push("/admin/dashboard/tutorials");
        }
      } catch (error) {
        console.error("Error fetching tutorial:", error);
        alert("Failed to fetch tutorial. Please try again.");
        router.push("/admin/dashboard/tutorials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorial();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8 bg-white min-h-screen">
          <p>Loading tutorial details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!tutorial) {
    return null; // Return nothing if the tutorial is not found
  }

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {tutorial.title}
        </h1>

        {/* Explanation Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Step-by-Step Explanation:
          </h2>
          {tutorial.explanation.map((step, index) => (
            <div
              key={index}
              className="border p-4 rounded-md mb-4 bg-gray-50 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-700 mb-4">{step.description}</p>
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Code Snippet:
                </h4>
                <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                  <code>{step.codeSnippet}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Button onClick={() => router.push("/admin/dashboard/tutorials")}>
            Back to Tutorials
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TutorialDetails;
