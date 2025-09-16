import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/course-data";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface CoursePageProps {
  params: { slug: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const priceDisplay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(course.price);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium lowercase tracking-wide text-muted-foreground">
                {course.level}
              </div>
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {course.title}
              </h1>
              <p className="max-w-prose text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>
            <section>
              <h2 className="mb-4 text-lg font-semibold tracking-tight">
                Curriculum
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((section) => (
                  <div
                    key={section.id}
                    className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
                      <h3 className="text-sm font-medium tracking-tight">
                        {section.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {section.lessons.length} lesson
                        {section.lessons.length !== 1 && "s"}
                      </span>
                    </div>
                    <ul className="divide-y divide-border/60">
                      {section.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                              {lesson.title.split(" ")[0]?.charAt(0)}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{lesson.duration}</span>
                            {course.enrolled && (
                              <Link
                                href={`/courses/${slug}/learn?lesson=${lesson.id}`}
                                className="rounded-full border border-border/60 px-3 py-1 text-[11px] font-medium hover:bg-muted/50"
                              >
                                Start
                              </Link>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6 rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-muted/60 to-muted" />
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold tracking-tight">
                  {priceDisplay}
                </p>
                <p className="text-xs text-muted-foreground">
                  One-time payment • Lifetime access
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center justify-between">
                  <span>Instructor</span>
                  <span className="font-medium text-foreground">
                    {course.instructor}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-foreground">
                    {course.duration}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Level</span>
                  <span className="font-medium text-foreground capitalize">
                    {course.level}
                  </span>
                </li>
              </ul>
              {course.enrolled ? (
                <Button asChild size="lg" className="w-full">
                  <Link href={`/courses/${slug}/learn`}>Continue learning</Link>
                </Button>
              ) : (
                <Button size="lg" className="w-full">
                  Enroll now
                </Button>
              )}
              <p className="text-center text-[11px] text-muted-foreground">
                30‑day money‑back guarantee
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
