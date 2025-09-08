import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

// This would typically fetch course data from your API
async function getCourse(slug: string) {
  // Mock data for now
  const courses = {
    "react-fundamentals": {
      id: "1",
      title: "React Fundamentals",
      description:
        "Learn the basics of React development from scratch. This comprehensive course covers everything you need to know to start building modern web applications with React.",
      instructor: "John Doe",
      duration: "8 hours",
      level: "Beginner",
      price: 99,
      enrolled: false,
      curriculum: [
        {
          id: "1",
          title: "Getting Started",
          lessons: [
            {
              id: "lesson-1",
              title: "Introduction to React",
              duration: "10 min",
            },
            {
              id: "lesson-2",
              title: "Setting up the Development Environment",
              duration: "15 min",
            },
            {
              id: "lesson-3",
              title: "Your First React Component",
              duration: "20 min",
            },
          ],
        },
        {
          id: "2",
          title: "Core Concepts",
          lessons: [
            { id: "lesson-4", title: "JSX and Elements", duration: "25 min" },
            { id: "lesson-5", title: "Props and State", duration: "30 min" },
            { id: "lesson-6", title: "Event Handling", duration: "20 min" },
          ],
        },
        {
          id: "3",
          title: "Advanced Topics",
          lessons: [
            { id: "lesson-7", title: "Hooks Introduction", duration: "35 min" },
            { id: "lesson-8", title: "Effect Hook", duration: "25 min" },
            {
              id: "lesson-9",
              title: "Building a Complete App",
              duration: "45 min",
            },
          ],
        },
      ],
    },
  };

  return courses[slug as keyof typeof courses] || null;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {course.level}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
              {course.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((section) => (
                <div key={section.id} className="border rounded-lg">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700">{lesson.title}</span>
                          <span className="text-sm text-gray-500">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-6"></div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${course.price}
              </div>
              <div className="text-sm text-gray-500">One-time payment</div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Instructor:</span>
                <span className="font-medium">{course.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Level:</span>
                <span className="font-medium">{course.level}</span>
              </div>
            </div>

            {course.enrolled ? (
              <Button asChild className="w-full" size="lg">
                <Link href={`/courses/${slug}/learn`}>Continue Learning</Link>
              </Button>
            ) : (
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
            )}

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
