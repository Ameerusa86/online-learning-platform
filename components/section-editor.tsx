"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  order: number;
}

interface SectionEditorProps {
  courseId: string;
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
  onAddLesson: (sectionId: string) => void;
  onEditLesson: (lessonId: string) => void;
}

export function SectionEditor({
  courseId,
  sections,
  onSectionsChange,
  onAddLesson,
  onEditLesson,
}: SectionEditorProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionDescription, setNewSectionDescription] = useState("");

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      description: newSectionDescription || undefined,
      order: sections.length + 1,
      lessons: [],
    };

    onSectionsChange([...sections, newSection]);
    setNewSectionTitle("");
    setNewSectionDescription("");
  };

  const handleEditSection = (
    sectionId: string,
    title: string,
    description?: string
  ) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, title, description } : section
    );
    onSectionsChange(updatedSections);
    setEditingSection(null);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this section? All lessons in this section will be deleted."
      )
    ) {
      const updatedSections = sections
        .filter((section) => section.id !== sectionId)
        .map((section, index) => ({ ...section, order: index + 1 }));
      onSectionsChange(updatedSections);
    }
  };

  const handleMoveSection = (sectionId: string, direction: "up" | "down") => {
    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(currentIndex, 1);
    updatedSections.splice(newIndex, 0, movedSection);

    // Update order numbers
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    onSectionsChange(reorderedSections);
  };

  return (
    <div className="space-y-6">
      {/* Course Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Course Structure</h2>
        <p className="text-sm text-gray-600">
          Organize your course content into sections and lessons. Each section
          can contain multiple lessons.
        </p>
      </div>

      {/* Existing Sections */}
      {sections.map((section, sectionIndex) => (
        <Card key={section.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingSection === section.id ? (
                  <EditSectionForm
                    section={section}
                    onSave={(title, description) =>
                      handleEditSection(section.id, title, description)
                    }
                    onCancel={() => setEditingSection(null)}
                  />
                ) : (
                  <div>
                    <CardTitle className="text-lg">
                      {sectionIndex + 1}. {section.title}
                    </CardTitle>
                    {section.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {section.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {section.lessons.length} lesson
                      {section.lessons.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>

              {editingSection !== section.id && (
                <div className="flex gap-2 ml-4">
                  {sectionIndex > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveSection(section.id, "up")}
                    >
                      ↑
                    </Button>
                  )}
                  {sectionIndex < sections.length - 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveSection(section.id, "down")}
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(section.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {/* Lessons */}
            {section.lessons.length > 0 ? (
              <div className="space-y-2 mb-4">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 w-8">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditLesson(lesson.id)}
                      >
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg mb-4">
                <p>No lessons in this section yet.</p>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddLesson(section.id)}
              className="w-full"
            >
              Add Lesson
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Add New Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Add New Section</h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="sectionTitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Section Title *
              </label>
              <input
                type="text"
                id="sectionTitle"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Getting Started, Core Concepts"
              />
            </div>

            <div>
              <label
                htmlFor="sectionDescription"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Section Description (Optional)
              </label>
              <textarea
                id="sectionDescription"
                rows={2}
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of what this section covers"
              />
            </div>

            <Button
              onClick={handleAddSection}
              disabled={!newSectionTitle.trim()}
            >
              Add Section
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for editing sections
interface EditSectionFormProps {
  section: Section;
  onSave: (title: string, description?: string) => void;
  onCancel: () => void;
}

function EditSectionForm({ section, onSave, onCancel }: EditSectionFormProps) {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description || "");

  const handleSave = () => {
    if (title.trim()) {
      onSave(title, description || undefined);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Section title"
      />
      <textarea
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Section description (optional)"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
