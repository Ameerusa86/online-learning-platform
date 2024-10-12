import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// Define Course type
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  price: string | number;
  category: string;
  chaptersCount: number;
  slug: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const {
    title,
    description,
    imageUrl,
    author,
    price,
    category,
    chaptersCount,
    slug,
  } = course;

  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/course/${slug}`);
  };

  // Price logic: Display "Free" if price is 0, otherwise display the price with a dollar sign
  const isFree = price === 0;
  const displayPrice = isFree ? "Free" : `$${price}`;

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative group">
        <Image
          height={250}
          width={400}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
          src={
            imageUrl ||
            "https://via.placeholder.com/800x600.png?text=No+Image+Available"
          }
          alt={title}
        />
        {/* Price and Category */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600">
          {displayPrice}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between">
        {/* Title and Description */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        {/* Author and Chapters Section */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span className="font-semibold">By {author}</span>
          <span className="ml-4">
            {chaptersCount > 0 ? `${chaptersCount} Chapters` : "No chapters"}
          </span>
        </div>

        {/* Enroll Button */}
        <Button
          className="w-full bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 py-2 transition duration-300"
          onClick={handleNavigate}
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
