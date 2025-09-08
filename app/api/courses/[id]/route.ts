import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Mock database - in production, you'd use a real database
const mockCourses: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    instructor: string;
    instructorId: string;
    duration: string;
    level: string;
    price: number;
    thumbnail: string;
    slug: string;
    status: string;
    enrollments: number;
    createdAt: string;
    updatedAt: string;
    category?: string;
  }
> = {
  "1": {
    id: "1",
    title: "React Fundamentals",
    description: "Learn the basics of React development from scratch",
    instructor: "John Doe",
    instructorId: "1",
    duration: "8 hours",
    level: "beginner",
    price: 99,
    thumbnail: "/placeholder.jpg",
    slug: "react-fundamentals",
    status: "published",
    enrollments: 45,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const course = mockCourses[id];

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const course = mockCourses[id];

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, price, level, status, category } = body;

    // Update course - in production, you'd update the database
    const updatedCourse = {
      ...course,
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(level && { level }),
      ...(status && { status }),
      ...(category && { category }),
      updatedAt: new Date().toISOString(),
    };

    // Mock update
    mockCourses[id] = updatedCourse;

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const course = mockCourses[id];

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Delete course - in production, you'd delete from the database
    delete mockCourses[id];

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
