import { getCourse } from "@/lib/course-data";
import { notFound } from "next/navigation";
import { LearnClient } from "@/components/learn/learn-client";

interface LearnPageProps {
  params: { slug: string };
  searchParams: { [k: string]: string | string[] | undefined };
}

export default async function LearnPage({
  params,
  searchParams,
}: LearnPageProps) {
  const { slug } = params;
  const course = await getCourse(slug);
  if (!course) notFound();
  // Determine active lesson: query param > first lesson
  const queryLesson =
    typeof searchParams.lesson === "string" ? searchParams.lesson : undefined;
  const firstLesson = course.curriculum[0]?.lessons[0];
  const activeLessonId = queryLesson || firstLesson?.id || "";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6 ">
      <LearnClient
        course={course}
        slug={course.slug}
        activeLessonId={activeLessonId}
      />
    </div>
  );
}
