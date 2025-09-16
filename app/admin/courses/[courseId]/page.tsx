"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CourseEditorProps {
  params: Promise<{ courseId: string }>;
}

export default function CourseEditorPage({ params }: CourseEditorProps) {
  const [courseId, setCourseId] = useState<string>("");

  // Extract courseId from params
  params.then(({ courseId }) => {
    setCourseId(courseId);
  });

  // Mock course data - this would come from your API
  const [courseData, setCourseData] = useState({
    id: courseId || "1",
    title: "React Fundamentals",
    description: "Learn the basics of React development from scratch",
    price: 99,
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    category: "Web Development",
    status: "published" as "draft" | "published",
    thumbnail: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would submit to your API
    // const response = await fetch(`/api/courses/${courseId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(courseData)
    // })

    console.log("Updating course:", courseData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCourseData((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleStatusChange = (status: "draft" | "published") => {
    setCourseData((prev) => ({ ...prev, status }));
  };

  if (!courseId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
          <p className="text-gray-600">
            Update course information and settings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="space-y-6">
                {/* Course Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={courseData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={courseData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Price and Level */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={courseData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="level"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Level *
                    </label>
                    <select
                      id="level"
                      name="level"
                      required
                      value={courseData.level}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={courseData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Thumbnail
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <Button type="submit">Update Course</Button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="font-semibold mb-4">Course Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      courseData.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {courseData.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <Button
                    variant={
                      courseData.status === "draft" ? "default" : "outline"
                    }
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusChange("draft")}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    variant={
                      courseData.status === "published" ? "default" : "outline"
                    }
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusChange("published")}
                  >
                    Publish Course
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Course Management</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Manage Sections
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  View Enrollments
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Course Analytics
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full justify-start"
                >
                  Delete Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
