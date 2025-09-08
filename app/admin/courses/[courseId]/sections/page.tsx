"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SectionsPageProps {
  params: Promise<{ courseId: string }>;
}

export default function SectionsPage({ params }: SectionsPageProps) {
  const [courseId, setCourseId] = useState<string>("");

  // Extract courseId from params
  params.then(({ courseId }) => {
    setCourseId(courseId);
  });

  // Mock sections data - this would come from your API
  const [sections, setSections] = useState([
    {
      id: "1",
      title: "Getting Started",
      order: 1,
      lessons: [
        {
          id: "lesson-1",
          title: "Introduction to React",
          duration: "10 min",
          order: 1,
        },
        {
          id: "lesson-2",
          title: "Setting up Environment",
          duration: "15 min",
          order: 2,
        },
        {
          id: "lesson-3",
          title: "Your First Component",
          duration: "20 min",
          order: 3,
        },
      ],
    },
    {
      id: "2",
      title: "Core Concepts",
      order: 2,
      lessons: [
        {
          id: "lesson-4",
          title: "JSX and Elements",
          duration: "25 min",
          order: 1,
        },
        {
          id: "lesson-5",
          title: "Props and State",
          duration: "30 min",
          order: 2,
        },
      ],
    },
  ]);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showNewSectionForm, setShowNewSectionForm] = useState(false);

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        id: Date.now().toString(),
        title: newSectionTitle,
        order: sections.length + 1,
        lessons: [],
      };
      setSections([...sections, newSection]);
      setNewSectionTitle("");
      setShowNewSectionForm(false);
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId));
  };

  if (!courseId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Sections
          </h1>
          <p className="text-gray-600">
            Organize your course content into sections and lessons.
          </p>
        </div>

        {/* Course Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">React Fundamentals</h2>
          <p className="text-gray-600">Course ID: {courseId}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-sm border"
            >
              {/* Section Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">
                    {sectionIndex + 1}. {section.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {section.lessons.length} lesson
                    {section.lessons.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit Section
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {/* Lessons */}
              <div className="p-6">
                {section.lessons.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">
                            {sectionIndex + 1}.{lessonIndex + 1}
                          </span>
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-gray-500">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`/admin/courses/${courseId}/lessons/${lesson.id}`}
                            >
                              Edit Lesson
                            </a>
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No lessons in this section yet.</p>
                  </div>
                )}

                <Button variant="outline" size="sm">
                  Add Lesson
                </Button>
              </div>
            </div>
          ))}

          {/* Add New Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {showNewSectionForm ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="sectionTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Section Title
                  </label>
                  <input
                    type="text"
                    id="sectionTitle"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter section title"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddSection}>Add Section</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowNewSectionForm(false);
                      setNewSectionTitle("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Button onClick={() => setShowNewSectionForm(true)}>
                  Add New Section
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
