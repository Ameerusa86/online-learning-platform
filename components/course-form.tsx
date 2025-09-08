"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/utils/slug";

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnail?: File | null;
}

interface CourseFormProps {
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export function CourseForm({
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Create Course",
  isLoading = false,
}: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || 0,
    level: initialData.level || "beginner",
    category: initialData.category || "",
    thumbnail: initialData.thumbnail || null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewSlug, setPreviewSlug] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));

    // Update slug preview when title changes
    if (name === "title") {
      setPreviewSlug(generateSlug(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
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
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., React Fundamentals for Beginners"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        {previewSlug && (
          <p className="mt-1 text-sm text-gray-500">
            URL slug:{" "}
            <code className="bg-gray-100 px-1 rounded">{previewSlug}</code>
          </p>
        )}
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
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe what students will learn in this course..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length} characters
        </p>
      </div>

      {/* Price and Level */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price (USD) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="99.00"
              disabled={isLoading}
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
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
            value={formData.level}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
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
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Web Development, Programming, Design"
          disabled={isLoading}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
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
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-gray-500">
          Upload an image for your course (JPG, PNG, max 2MB)
        </p>
        {formData.thumbnail && (
          <p className="mt-1 text-sm text-green-600">
            Selected: {formData.thumbnail.name}
          </p>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
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
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
