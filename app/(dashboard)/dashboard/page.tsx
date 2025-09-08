import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">
          Continue your learning journey and track your progress.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Enrolled Courses
          </h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Completed Lessons
          </h3>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Hours Learned
          </h3>
          <p className="text-2xl font-bold text-gray-900">28</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Certificates
          </h3>
          <p className="text-2xl font-bold text-gray-900">1</p>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Continue Learning
          </h2>
          <Button variant="outline" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder course cards */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold mb-2">React Fundamentals</h3>
            <p className="text-sm text-gray-600 mb-4">
              Learn the basics of React development
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
            <Button size="sm" asChild>
              <Link href="/courses/react-fundamentals/learn">Continue</Link>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold mb-2">JavaScript Advanced</h3>
            <p className="text-sm text-gray-600 mb-4">
              Master advanced JavaScript concepts
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <Button size="sm" asChild>
              <Link href="/courses/javascript-advanced/learn">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
