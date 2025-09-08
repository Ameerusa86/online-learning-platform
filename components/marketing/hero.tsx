"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { logos } from "@/public/Images/Logos/logos";

export function Hero() {
  const refText = useReveal<HTMLDivElement>();
  const refMedia = useReveal<HTMLDivElement>({
    rootMargin: "0px 0px -5% 0px",
    threshold: 0.2,
  });
  return (
    <section className="relative isolate pad-x-page pad-section-y">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-[0.15] blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-24">
        <div ref={refText} className="reveal space-y-8">
          <Badge variant="glow" className="pl-2.5 pr-3">
            <span className="relative flex h-1.5 w-1.5 items-center justify-center">
              <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Teams & Cohorts
          </Badge>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-gradient">Build, teach, and scale</span>{" "}
            courses with extraordinary polish.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            A modern, extensible LMS powered by Next.js, Shadcn/UI, and
            Supabase. Publish courses, onboard learners, and track progress—all
            in one place.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6 text-sm font-semibold">
              <Link href="/dashboard">Get started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 px-6 text-sm font-semibold"
            >
              <Link href="#features">
                <Play className="mr-2 h-4 w-4" /> View demo
              </Link>
            </Button>
          </div>
        </div>
        <div ref={refMedia} className="reveal-zoom relative">
          <div className="glass group relative aspect-video w-full overflow-hidden rounded-3xl border border-border/70 shadow-lg ring-1 ring-border/50">
            <Image
              src="/Images/img-3.png"
              alt="Product preview"
              fill
              priority
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%,hsl(var(--gradient-mid)/0.15),transparent 60%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute -inset-x-8 -bottom-8 -top-8 -z-10 opacity-30 blur-3xl [background:radial-gradient(100%_100%_at_50%_0%,hsl(var(--gradient-end))_0,transparent_60%)]" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 mt-10 flex flex-wrap items-center justify-center gap-8 opacity-70">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex h-16 w-48 items-center justify-center rounded-md border border-border/50 bg-muted/60 text-[10px] font-medium uppercase tracking-wide text-muted-foreground hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={125}
                height={125}
                className="h-12 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
