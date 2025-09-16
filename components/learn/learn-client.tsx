"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VideoPlayer } from "@/components/video-player";
import type { CourseData } from "@/lib/course-data";
import { Navbar } from "../marketing/navbar";
import { Footer } from "../marketing/footer";

interface LearnClientProps {
  course: CourseData;
  slug: string;
  activeLessonId: string;
}

export function LearnClient({
  course,
  slug,
  activeLessonId,
}: LearnClientProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [loadingMedia, setLoadingMedia] = useState(false);

  const lessonsFlat = useMemo(
    () =>
      course.curriculum.flatMap((section) =>
        section.lessons.map((l) => ({
          ...l,
          sectionId: section.id,
          sectionTitle: section.title,
        }))
      ),
    [course]
  );

  const activeLesson =
    lessonsFlat.find((l) => l.id === activeLessonId) || lessonsFlat[0];

  // Fetch media for active lesson
  useEffect(() => {
    if (!activeLesson) return;
    let cancelled = false;
    setLoadingMedia(true);
    fetch(`/api/lessons/${activeLesson.id}/media`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!cancelled) setMediaUrl(d.url);
      })
      .catch(() => {
        if (!cancelled) setMediaUrl(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingMedia(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeLesson]);

  const handleSelectLesson = (id: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("lesson", id);
    router.push(`/courses/${slug}/learn?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Add top padding = navbar height (e.g., 56px or 64px) */}
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-6 lg:pb-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-3">
              {mediaUrl && !loadingMedia ? (
                <VideoPlayer
                  src={mediaUrl}
                  title={activeLesson.title}
                  autoPlay
                />
              ) : (
                <div className="aspect-video w-full animate-pulse rounded-xl bg-muted" />
              )}
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/60 p-6">
              <h1 className="mb-2 truncate text-xl font-semibold tracking-tight">
                {course.title}
              </h1>
              <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                {activeLesson.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                Duration: {activeLesson.duration}
              </p>
            </div>
          </div>

          {/* Right rail / curriculum */}
          <aside className="max-h-[calc(100dvh-10rem)] overflow-y-auto pr-1 space-y-4">
            {course.curriculum.map((section) => (
              <div
                key={section.id}
                className="overflow-hidden rounded-xl border border-border/60 bg-background/60"
              >
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    {section.lessons.length} lesson
                    {section.lessons.length !== 1 && "s"}
                  </span>
                </div>
                <ul className="divide-y divide-border/60">
                  {section.lessons.map((lesson) => {
                    const active = lesson.id === activeLesson.id;
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => handleSelectLesson(lesson.id)}
                          className={[
                            "group flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-xs transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted/50",
                          ].join(" ")}
                        >
                          <span className="flex-1 truncate">
                            {lesson.title}
                          </span>
                          <span className="shrink-0 text-[10px] text-muted-foreground group-hover:text-foreground">
                            {lesson.duration}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </main>

      {/* Footer sits at the very bottom */}
      <Footer />
    </div>
  );
}
