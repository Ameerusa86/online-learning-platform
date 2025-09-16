"use client";
import { useEffect, useRef } from "react";

interface UseRevealOptions {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  classNameVisible?: string;
}

/**
 * useReveal - adds 'is-visible' class when element intersects viewport.
 */
export function useReveal<T extends HTMLElement>(
  options: UseRevealOptions = {}
) {
  const {
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.15,
    once = true,
    classNameVisible = "is-visible",
  } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add(classNameVisible);
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once, classNameVisible]);

  return ref;
}
