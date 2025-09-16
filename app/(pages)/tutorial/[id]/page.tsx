"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { firestore } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
    codeSnippet: string;
  }[];
}

const TutorialDetails: React.FC = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const docRef = doc(firestore, "tutorials", id as string);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setTutorial({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          } as Tutorial);
        } else {
          console.error("Tutorial not found");
        }
      } catch (error) {
        console.error("Error fetching tutorial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  if (loading) {
    return <div>Loading tutorial...</div>;
  }

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>
      <p className="text-lg mb-6">{tutorial.description}</p>
      {tutorial.steps &&
        tutorial.steps.map((step, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-700 mb-4">{step.description}</p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              <code>{step.codeSnippet}</code>
            </pre>
          </div>
        ))}
    </div>
  );
};

export default TutorialDetails;
