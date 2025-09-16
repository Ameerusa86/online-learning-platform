/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove special characters except hyphens
      .replace(/[^a-z0-9-]/g, "")
      // Replace multiple consecutive hyphens with a single hyphen
      .replace(/-+/g, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}

/**
 * Validates if a slug is properly formatted
 * @param slug - The slug to validate
 * @returns True if the slug is valid
 */
export function isValidSlug(slug: string): boolean {
  // Slug should only contain lowercase letters, numbers, and hyphens
  // Should not start or end with hyphens
  // Should not have consecutive hyphens
  const slugRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  return slugRegex.test(slug) && slug.length >= 2 && slug.length <= 100;
}

/**
 * Ensures a slug is unique by appending a number if necessary
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function ensureUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Converts a slug back to a readable title
 * @param slug - The slug to convert
 * @returns A title-case string
 */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generates a course slug from title and instructor
 * @param title - Course title
 * @param instructor - Instructor name (optional)
 * @returns A course-specific slug
 */
export function generateCourseSlug(title: string, instructor?: string): string {
  const baseSlug = generateSlug(title);

  if (instructor) {
    const instructorSlug = generateSlug(instructor);
    return `${baseSlug}-by-${instructorSlug}`;
  }

  return baseSlug;
}

// Example usage:
/*
console.log(generateSlug('React Fundamentals for Beginners'))
// Output: 'react-fundamentals-for-beginners'

console.log(generateSlug('Advanced JavaScript & ES6+ Features'))
// Output: 'advanced-javascript-es6-features'

console.log(isValidSlug('react-fundamentals'))
// Output: true

console.log(isValidSlug('React-Fundamentals'))
// Output: false (contains uppercase)

console.log(ensureUniqueSlug('react-basics', ['react-basics', 'react-basics-1']))
// Output: 'react-basics-2'

console.log(slugToTitle('react-fundamentals-for-beginners'))
// Output: 'React Fundamentals For Beginners'

console.log(generateCourseSlug('React Fundamentals', 'John Doe'))
// Output: 'react-fundamentals-by-john-doe'
*/
