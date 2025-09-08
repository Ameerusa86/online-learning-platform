"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LessonEditorProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default function LessonEditorPage({ params }: LessonEditorProps) {
  const [courseId, setCourseId] = useState<string>("");
  const [lessonId, setLessonId] = useState<string>("");

  // Extract params
  params.then(({ courseId, lessonId }) => {
    setCourseId(courseId);
    setLessonId(lessonId);
  });

  // Mock lesson data - this would come from your API
  const [lessonData, setLessonData] = useState({
    id: lessonId || "lesson-1",
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React and why it's a powerful library for building user interfaces.",
    content:
      "# Introduction to React\n\nReact is a popular JavaScript library for building user interfaces...",
    videoUrl: "",
    duration: 10,
    order: 1,
    isPublished: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would submit to your API
    // const response = await fetch(`/api/lessons/${lessonId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(lessonData)
    // })

    console.log("Updating lesson:", lessonData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "order" ? parseInt(value) || 0 : value,
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle video upload logic here
      console.log("Video file selected:", file.name);
    }
  };

  if (!courseId || !lessonId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Lesson</h1>
          <p className="text-gray-600">
            Course: React Fundamentals • Lesson ID: {lessonId}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Lesson Details */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Lesson Details</h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Lesson Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={lessonData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Duration (minutes) *
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        required
                        min="1"
                        value={lessonData.duration}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="order"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Lesson Order *
                      </label>
                      <input
                        type="number"
                        id="order"
                        name="order"
                        required
                        min="1"
                        value={lessonData.order}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={lessonData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of what this lesson covers"
                    />
                  </div>
                </div>
              </div>

              {/* Video Upload */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Video Content</h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="videoFile"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Upload Video
                    </label>
                    <input
                      type="file"
                      id="videoFile"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: MP4, MOV, AVI (max 500MB)
                    </p>
                  </div>

                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-gray-400">
                      <div className="text-4xl mb-2">📹</div>
                      <p>Video preview will appear here</p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="videoUrl"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Or Enter Video URL
                    </label>
                    <input
                      type="url"
                      id="videoUrl"
                      name="videoUrl"
                      value={lessonData.videoUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Lesson Content</h2>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content (Markdown)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={12}
                    value={lessonData.content}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Write your lesson content in Markdown format..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You can use Markdown syntax for formatting. Preview will be
                    available after saving.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Update Lesson
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="font-semibold mb-4">Lesson Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Published:</span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      lessonData.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {lessonData.isPublished ? "Yes" : "Draft"}
                  </span>
                </div>
                <div className="space-y-2">
                  <Button
                    variant={!lessonData.isPublished ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      setLessonData((prev) => ({ ...prev, isPublished: false }))
                    }
                  >
                    Save as Draft
                  </Button>
                  <Button
                    variant={lessonData.isPublished ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      setLessonData((prev) => ({ ...prev, isPublished: true }))
                    }
                  >
                    Publish Lesson
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Preview Lesson
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Duplicate Lesson
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full justify-start"
                >
                  Delete Lesson
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
