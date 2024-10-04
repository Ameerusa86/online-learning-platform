// app/page.js
"use client";

import Hero from "@/components/Hero";
import LatestCourses from "@/components/LatestCourses";
import TechPage from "@/components/Tech";
import React from "react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechPage />
      <LatestCourses />
    </>
  );
}
