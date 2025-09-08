import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "glow" | "soft";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase";
  const styles: Record<string, string> = {
    default:
      "bg-gradient-brand text-primary-foreground border-transparent shadow-sm",
    outline: "border-border/60 text-muted-foreground",
    glow: "border-transparent bg-primary/15 text-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_4px_18px_-4px_hsl(var(--gradient-mid)/0.45)]",
    soft: "bg-primary/10 text-primary border-primary/20",
  };
  return <span className={cn(base, styles[variant], className)} {...props} />;
}
