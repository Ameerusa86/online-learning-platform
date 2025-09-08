import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-transparent to-transparent p-8 md:p-12">
        <div className="max-w-2xl space-y-4">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ship your first course today
          </h3>
          <p className="text-sm text-muted-foreground md:text-base">
            Create a course, upload lessons, and invite your first cohort in
            minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/admin/courses/new">Create course</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs">Read docs</Link>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      </div>
    </section>
  );
}
