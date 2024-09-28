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
  price: string | number; // Price can be a string or a number
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
    router.push(`/course/${course.slug}`);
  };

  // Price logic: Display "Free" if price is 0, otherwise display the price with a dollar sign
  const displayPrice = price === 0 ? "Free" : `$${price}`;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full sm:w-full lg:w-full bg-white rounded-xl overflow-hidden transform transition">
        <div className="relative">
          <Image
            height={400}
            width={500}
            className="w-full h-48 sm:h-56 md:h-64 object-cover duration-500 hover:scale-105"
            src={
              imageUrl ||
              "https://via.placeholder.com/800x600.png?text=No+Image+Available"
            }
            alt={title}
          />
          <div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-xs sm:text-sm font-semibold">
            {category}
          </div>
          <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-xs sm:text-sm font-semibold">
            {displayPrice}
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 text-gray-800">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4">
            {description}
          </p>

          <div className="flex flex-col justify-between items-start">
            {" "}
            {/* Changed to items-start to align content to the left */}
            <span className="text-xs sm:text-sm md:text-base text-gray-800 font-semibold text-left">
              {" "}
              {/* Added text-left */}
              Author: {author}
            </span>
            <span className="text-xs sm:text-sm mt-2 text-left">
              {" "}
              {/* Added text-left */}
              Chapters: {chaptersCount}
            </span>
            <Button
              className="px-3 mt-4 sm:px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out text-xs sm:text-sm md:text-base w-full"
              onClick={handleNavigate}
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
