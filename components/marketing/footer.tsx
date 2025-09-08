"use client";
import { navLinks } from "@/lib/marketing";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

export function Footer() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1 });
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/70 backdrop-blur">
      <div ref={ref} className="reveal mx-auto max-w-7xl pad-x-page py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 space-y-3 sm:col-span-1">
            <div className="text-lg font-semibold tracking-tight text-gradient">
              LMS
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Learn anything, beautifully.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/80">
              Product
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    className="transition-colors hover:text-foreground"
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/80">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} LMS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
