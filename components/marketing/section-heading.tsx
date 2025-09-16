import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/80">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
