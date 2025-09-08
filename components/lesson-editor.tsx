"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LessonData {
  id: string;
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isPublished: boolean;
}

interface LessonEditorProps {
  lesson: LessonData;
  onSave: (lesson: LessonData) => Promise<void>;
  onCancel?: () => void;
  onDelete?: (lessonId: string) => Promise<void>;
}

export function LessonEditor({
  lesson,
  onSave,
  onCancel,
  onDelete,
}: LessonEditorProps) {
  const [formData, setFormData] = useState<LessonData>(lesson);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "content" | "video">(
    "details"
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "order" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving lesson:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (onDelete && confirm("Are you sure you want to delete this lesson?")) {
      setIsLoading(true);
      try {
        await onDelete(lesson.id);
      } catch (error) {
        console.error("Error deleting lesson:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle video upload logic here
      console.log("Video file selected:", file.name);
      // You would upload the file and get back a URL
      // setFormData(prev => ({ ...prev, videoUrl: uploadedUrl }))
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Lesson</h1>
        <p className="text-gray-600">Update lesson content and settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex border-b">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "details"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "content"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("content")}
                >
                  Content
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "video"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("video")}
                >
                  Video
                </button>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                {activeTab === "details" && (
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
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={isLoading}
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
                          min="1"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          disabled={isLoading}
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
                          min="1"
                          value={formData.order}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          disabled={isLoading}
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
                        value={formData.description || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of what this lesson covers"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "content" && (
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Lesson Content (Markdown)
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={15}
                      value={formData.content || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="Write your lesson content in Markdown format..."
                      disabled={isLoading}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      You can use Markdown syntax for formatting. Preview will
                      be available after saving.
                    </p>
                  </div>
                )}

                {activeTab === "video" && (
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
                        disabled={isLoading}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Supported formats: MP4, MOV, AVI (max 500MB)
                      </p>
                    </div>

                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      {formData.videoUrl ? (
                        <div className="text-green-600">
                          <div className="text-4xl mb-2">✓</div>
                          <p>Video uploaded successfully</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.videoUrl}
                          </p>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <div className="text-4xl mb-2">📹</div>
                          <p>No video uploaded</p>
                        </div>
                      )}
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
                        value={formData.videoUrl || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/video.mp4"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                  {onCancel && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Lesson"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Published:</span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      formData.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {formData.isPublished ? "Yes" : "Draft"}
                  </span>
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant={!formData.isPublished ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, isPublished: false }))
                    }
                    disabled={isLoading}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="button"
                    variant={formData.isPublished ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, isPublished: true }))
                    }
                    disabled={isLoading}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={isLoading}
                >
                  Preview Lesson
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={isLoading}
                >
                  Duplicate
                </Button>
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Delete Lesson
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
