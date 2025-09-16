"use client";

import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "@/components/Cards/CategoryCard";
import { images } from "@/public/images";

const technologies = [
  { name: "Angular", image: images.angular },
  { name: "React JS", image: images.react },
  { name: "Next JS", image: images.nextjs },
  { name: "Python", image: images.python },
  { name: "MongoDB", image: images.mongodb },
  { name: "RPA", image: images.rpa },
  { name: "Docker", image: images.docker },
  { name: "C#", image: images.c2 },
  { name: "HTML, CSS, JS", image: images.html },
  { name: "SQL", image: images.sql },
];

const TechPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-900">
      <motion.h1
        className="text-5xl font-extrabold leading-tight text-white mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Technologies
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-6">
        {technologies.map((tech, index) => (
          <CategoryCard
            key={index}
            name={tech.name}
            image={tech.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TechPage;
