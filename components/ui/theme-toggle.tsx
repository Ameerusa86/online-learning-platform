"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch by not rendering theme‑dependent icon until mounted
  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
    >
      {!mounted ? (
        // Placeholder keeps consistent SSR/CSR markup
        <Sun className="h-4 w-4 opacity-0" aria-hidden="true" />
      ) : isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
