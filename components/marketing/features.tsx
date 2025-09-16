"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ShieldCheck, LineChart, Upload } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { useReveal } from "@/hooks/useReveal";

const items = [
  {
    title: "Course Builder",
    icon: BookOpen,
    desc: "Create sections & lessons with markdown and rich media.",
  },
  {
    title: "Secure by default",
    icon: ShieldCheck,
    desc: "RLS policies, private media, and signed URLs.",
  },
  {
    title: "Analytics",
    icon: LineChart,
    desc: "Track enrollments, completions, and time-on-lesson.",
  },
  {
    title: "Fast uploads",
    icon: Upload,
    desc: "Upload to Supabase Storage with signed upload URLs.",
  },
];

export function Features() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section
      id="features"
      className="pad-x-page pad-section-y mx-auto max-w-7xl"
    >
      <SectionHeading
        title={
          <span className="text-gradient">Everything you need to teach</span>
        }
        subtitle="From course authoring to learner progress—built in."
      />
      <div
        ref={ref}
        className="reveal mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((f, i) => (
          <Card
            key={f.title}
            className={`rounded-3xl bg-gradient-to-b from-background/80 to-background/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[hsl(var(--gradient-mid)/0.15)] reveal reveal-delay-${
              i % 3
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <f.icon className="h-5 w-5" />
                </span>
                <CardTitle className="text-base font-semibold">
                  {f.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 text-sm leading-relaxed">
              {f.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
