import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  thumbnail?: string;
  slug: string;
  enrollments?: number;
}

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact" | "detailed";
  showInstructor?: boolean;
  showPrice?: boolean;
  showEnrollments?: boolean;
}

export function CourseCard({
  course,
  variant = "default",
  showInstructor = true,
  showPrice = true,
  showEnrollments = false,
}: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (variant === "compact") {
    return (
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-lg" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight mb-1 truncate">
                {course.title}
              </h3>
              {showInstructor && (
                <p className="text-xs text-gray-600 mb-1">
                  {course.instructor}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getLevelColor(
                    course.level
                  )}`}
                >
                  {course.level}
                </span>
                {showPrice && (
                  <span className="text-sm font-bold">
                    {formatPrice(course.price)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 text-lg">📚</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(
              course.level
            )}`}
          >
            {course.level}
          </span>
          {showPrice && (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(course.price)}
            </span>
          )}
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="space-y-2">
          {showInstructor && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Instructor:</span>
              <span className="font-medium">{course.instructor}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Duration:</span>
            <span className="font-medium">{course.duration}</span>
          </div>

          {showEnrollments && course.enrollments !== undefined && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Students:</span>
              <span className="font-medium">{course.enrollments}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.slug}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Grid container component for course cards
interface CourseGridProps {
  courses: Course[];
  variant?: "default" | "compact" | "detailed";
  showInstructor?: boolean;
  showPrice?: boolean;
  showEnrollments?: boolean;
}

export function CourseGrid({
  courses,
  variant = "default",
  ...props
}: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No courses found
        </h3>
        <p className="text-gray-600">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const gridClass =
    variant === "compact"
      ? "grid gap-4 md:grid-cols-2 lg:grid-cols-1"
      : "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={gridClass}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          variant={variant}
          {...props}
        />
      ))}
    </div>
  );
}
