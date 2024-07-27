// app/page.js
"use client";

import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import LatestCourses from "./components/LatestCourses";
import ProtectedRoute from "./components/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Hero />
      <LatestCourses />
      <Categories />
      <AboutUs />
      <Contact />
    </ProtectedRoute>
  );
}
