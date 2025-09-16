export interface LessonItem {
  id: string;
  title: string;
  duration: string;
}
export interface SectionItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}
export interface CourseData {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  enrolled?: boolean;
  curriculum: SectionItem[];
}

const mock: Record<string, CourseData> = {
  "react-fundamentals": {
    id: "1",
    slug: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Learn the basics of React development from scratch. This comprehensive course covers everything you need to know to start building modern web applications with React.",
    instructor: "John Doe",
    duration: "8h",
    level: "beginner",
    price: 99,
    enrolled: true,
    curriculum: [
      {
        id: "1",
        title: "Getting Started",
        lessons: [
          { id: "lesson-1", title: "Introduction to React", duration: "10m" },
          {
            id: "lesson-2",
            title: "Setting up the Environment",
            duration: "15m",
          },
          { id: "lesson-3", title: "Your First Component", duration: "20m" },
        ],
      },
      {
        id: "2",
        title: "Core Concepts",
        lessons: [
          { id: "lesson-4", title: "JSX & Rendering", duration: "25m" },
          { id: "lesson-5", title: "Props & State", duration: "30m" },
          { id: "lesson-6", title: "Event Handling", duration: "20m" },
        ],
      },
      {
        id: "3",
        title: "Advanced Topics",
        lessons: [
          { id: "lesson-7", title: "Hooks Overview", duration: "35m" },
          { id: "lesson-8", title: "useEffect Deep Dive", duration: "25m" },
          { id: "lesson-9", title: "Building a Complete App", duration: "45m" },
        ],
      },
    ],
  },
  "javascript-advanced": {
    id: "2",
    slug: "javascript-advanced",
    title: "Advanced JavaScript",
    description:
      "Deep dive into advanced JavaScript concepts: execution model, closures, prototypes, async patterns, performance, and architecture techniques for large front-end codebases.",
    instructor: "Jane Smith",
    duration: "12h",
    level: "advanced",
    price: 129,
    enrolled: false,
    curriculum: [
      {
        id: "1",
        title: "Runtime & Execution Contexts",
        lessons: [
          { id: "jsadv-1", title: "Call Stack & Memory", duration: "18m" },
          {
            id: "jsadv-2",
            title: "Scope & Lexical Environments",
            duration: "24m",
          },
          { id: "jsadv-3", title: "Hoisting Nuances", duration: "16m" },
        ],
      },
      {
        id: "2",
        title: "Functions & Closures",
        lessons: [
          { id: "jsadv-4", title: "Closures in Practice", duration: "22m" },
          { id: "jsadv-5", title: "Higher‑Order Patterns", duration: "28m" },
          { id: "jsadv-6", title: "Module Patterns", duration: "20m" },
        ],
      },
      {
        id: "3",
        title: "Async & Concurrency",
        lessons: [
          { id: "jsadv-7", title: "Event Loop Deep Dive", duration: "26m" },
          { id: "jsadv-8", title: "Promises & Microtasks", duration: "25m" },
          { id: "jsadv-9", title: "Async/Await Patterns", duration: "32m" },
        ],
      },
      {
        id: "4",
        title: "Performance & Architecture",
        lessons: [
          { id: "jsadv-10", title: "Memory & GC Insights", duration: "19m" },
          {
            id: "jsadv-11",
            title: "Profiling & Optimization",
            duration: "27m",
          },
          { id: "jsadv-12", title: "Designing Large Apps", duration: "34m" },
        ],
      },
    ],
  },
};

export async function getCourse(slug: string): Promise<CourseData | null> {
  // simulate latency
  await new Promise((r) => setTimeout(r, 50));
  const key = slug.toLowerCase();
  return mock[key] || null;
}

export async function getCourses(): Promise<CourseData[]> {
  await new Promise((r) => setTimeout(r, 50));
  return Object.values(mock);
}
