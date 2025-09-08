import Link from "next/link";
import { Button } from "@/components/ui/button";

// This would typically fetch courses from your API
async function getCourses() {
  // Mock data for now
  return [
    {
      id: "1",
      title: "React Fundamentals",
      description: "Learn the basics of React development from scratch",
      instructor: "John Doe",
      duration: "8 hours",
      level: "Beginner",
      price: 99,
      thumbnail: "/placeholder.jpg",
      slug: "react-fundamentals",
    },
    {
      id: "2",
      title: "JavaScript Advanced",
      description: "Master advanced JavaScript concepts and patterns",
      instructor: "Jane Smith",
      duration: "12 hours",
      level: "Advanced",
      price: 149,
      thumbnail: "/placeholder.jpg",
      slug: "javascript-advanced",
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js",
      instructor: "Mike Johnson",
      duration: "15 hours",
      level: "Intermediate",
      price: 129,
      thumbnail: "/placeholder.jpg",
      slug: "nodejs-backend",
    },
  ];
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
        <p className="text-gray-600">
          Discover and enroll in courses to advance your skills.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" size="sm">
            All Levels
          </Button>
          <Button variant="outline" size="sm">
            Beginner
          </Button>
          <Button variant="outline" size="sm">
            Intermediate
          </Button>
          <Button variant="outline" size="sm">
            Advanced
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {course.level}
                </span>
                <span className="font-bold text-lg">${course.price}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>By {course.instructor}</span>
                <span>{course.duration}</span>
              </div>
              <Button asChild className="w-full">
                <Link href={`/courses/${course.slug}`}>View Course</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
