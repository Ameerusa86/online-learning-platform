import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative rounded-3xl border border-border/70 bg-background/80 text-foreground shadow-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-[hsl(var(--gradient-mid)/0.15)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:border before:border-transparent before:bg-[linear-gradient(hsl(var(--background)),hsl(var(--background)))_padding-box,linear-gradient(120deg,hsl(var(--gradient-start)),hsl(var(--gradient-end)))_border-box] before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-70",
        className
      )}
      {...props}
    />
  );
}
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-5 pt-0 text-muted-foreground", className)}
      {...props}
    />
  );
}
