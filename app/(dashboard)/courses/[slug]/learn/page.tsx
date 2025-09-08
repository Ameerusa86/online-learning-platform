// app/(dashboard)/courses/[slug]/learn/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LearnPage() {
  const sp = useSearchParams();
  const lessonId = sp.get("lesson");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;
    fetch(`/api/lessons/${lessonId}/media`)
      .then((r) => r.json())
      .then((d) => setMediaUrl(d.url));
  }, [lessonId]);

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="rounded-2xl bg-muted p-2">
        {mediaUrl ? (
          <video src={mediaUrl} controls className="w-full rounded-xl" />
        ) : (
          <div className="h-64 animate-pulse rounded-xl" />
        )}
      </div>
      <aside className="space-y-4">{/* curriculum + progress toggles */}</aside>
    </div>
  );
}
