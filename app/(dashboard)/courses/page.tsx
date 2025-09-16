import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { CoursesClient } from "@/components/courses/courses-client";

// TODO: Replace with real data fetching (e.g. from DB or API route)
async function getCourses() {
  return [
    {
      id: "1",
      title: "React Fundamentals",
      description: "Learn the basics of React development from scratch",
      instructor: "John Doe",
      duration: "8h",
      level: "beginner" as const,
      price: 99,
      slug: "react-fundamentals",
    },
    {
      id: "2",
      title: "JavaScript Advanced",
      description: "Master advanced JavaScript concepts and patterns",
      instructor: "Jane Smith",
      duration: "12h",
      level: "advanced" as const,
      price: 149,
      slug: "javascript-advanced",
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js",
      instructor: "Mike Johnson",
      duration: "15h",
      level: "intermediate" as const,
      price: 129,
      slug: "nodejs-backend",
    },
  ];
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <Navbar />
      {/* Hero / heading */}
      <section className="relative overflow-hidden border-b border-border/60 bg-background/50">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_60%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-16 pt-14 md:px-6 md:pb-20 md:pt-20">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore our <span className="text-gradient">course catalog</span>
            </h1>
            <p className="max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
              Curated learning paths and expert‑led lessons to accelerate your
              skills. Filter by level or search to find exactly what you need.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground/80">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 py-1">
              Quality content
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 py-1">
              Practical projects
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 py-1">
              Lifetime access
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 py-1">
              Certificate ready
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-6 md:py-16">
        <CoursesClient courses={courses} />
      </main>
      <Footer />
    </div>
  );
}
