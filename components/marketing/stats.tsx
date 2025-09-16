"use client";
import { useReveal } from "@/hooks/useReveal";

export function Stats() {
  const stats = [
    { label: "Courses published", value: "1,240" },
    { label: "Active learners", value: "18,905" },
    { label: "Avg. completion", value: "86%" },
    { label: "Avg. rating", value: "4.8/5" },
  ];
  const ref = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section className="relative isolate pad-x-page">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--gradient-start)/0.15),hsl(var(--gradient-end)/0.15))] opacity-20" />
      <div ref={ref} className="mx-auto max-w-7xl py-14 reveal">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 text-center shadow-sm backdrop-blur transition-colors hover:border-border hover:shadow-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 w-full bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
