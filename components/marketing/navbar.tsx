"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/marketing";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll shadow + frosted background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        role="banner"
        className={[
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled
            ? // Frosted: backdrop blur + slightly translucent *with* solid fallback
              "bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
            : "bg-background",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="font-semibold tracking-tight">
            LMS
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            className="inline-flex items-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu in a portal (full-screen, opaque) */}
      {typeof window !== "undefined" &&
        createPortal(
          <MobileMenu open={open} onClose={() => setOpen(false)} />,
          document.body
        )}
    </>
  );
}

/* ------------------------------ MobileMenu ------------------------------ */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] md:hidden bg-[hsl(var(--background))] text-foreground"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <Link
          href="/"
          className="font-semibold tracking-tight"
          onClick={onClose}
        >
          LMS
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Centered, large links */}
      <div className="flex h-[calc(100dvh-56px-84px)] flex-col items-center justify-center px-6">
        <nav
          aria-label="Primary mobile"
          className="mx-auto flex w-full max-w-md flex-col items-stretch gap-4 text-center"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="rounded-2xl border px-6 py-5 text-2xl font-semibold tracking-tight hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between gap-4 border-t px-6 py-5">
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} LMS
        </span>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="h-11 px-5 text-base">
            <Link href="/login" onClick={onClose}>
              Sign in
            </Link>
          </Button>
          <Button asChild className="h-11 px-5 text-base">
            <Link href="/register" onClick={onClose}>
              Get started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
