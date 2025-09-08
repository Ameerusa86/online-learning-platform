export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

// Example function for generating testimonial data (placeholder)
export function getTestimonials(limit = 3) {
  return Array.from({ length: limit }).map((_, i) => ({
    name: `Student ${i + 1}`,
    role: "Learner",
    quote: "This platform made learning delightful and efficient.",
  }));
}
