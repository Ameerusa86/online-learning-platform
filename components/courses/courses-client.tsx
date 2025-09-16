"use client";
import { useMemo, useState } from "react";
import { CourseGrid } from "@/components/course-card";
import { Button } from "@/components/ui/button";

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

export function CoursesClient({ courses }: { courses: Course[] }) {
  const [level, setLevel] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchLevel = level === "all" || c.level.toLowerCase() === level;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      return matchLevel && matchQuery;
    });
  }, [courses, level, query]);

  const levels: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  return (
    <div className="space-y-10">
      {/* Filters */}
      <div className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur px-5 py-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => {
              const active = level === l.value;
              return (
                <Button
                  key={l.value}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className={active ? "shadow-sm" : "bg-background/40"}
                  onClick={() => setLevel(l.value)}
                >
                  {l.label}
                </Button>
              );
            })}
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30"
              aria-label="Search courses"
            />
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {filtered.length} course{filtered.length !== 1 && "s"} found
        </span>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="underline-offset-2 hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      <CourseGrid courses={filtered} />
    </div>
  );
}
