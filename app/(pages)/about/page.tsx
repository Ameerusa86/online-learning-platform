"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { images } from "@/public/images";

const AboutMe: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-col gap-8 lg:flex-row items-center justify-between">
        {/* Profile Picture */}
        <motion.div
          className="w-full sm:w-2/3 lg:w-1/3 mb-10 lg:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={images.profile}
            alt="Profile Picture"
            width={400}
            height={400}
            className="rounded-full shadow-lg border-8 border-teal-500"
          />
        </motion.div>

        {/* Profile Info */}
        <motion.div
          className="w-full lg:w-2/3 text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hello, I'm Ameer Hasan
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            I’m a passionate software developer with a master's degree in
            Information Technology, specializing in web and app development. I
            enjoy turning complex problems into simple, beautiful, and intuitive
            solutions. I’m always eager to learn new technologies and improve my
            skills.
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            Currently, I am working as a Software Developer, specializing in
            Robotic Process Automation (RPA) to automate business processes. My
            expertise includes Full Stack Web Development, Python apps, React
            JS, Next JS, Angular, Node JS, MongoDB, Python, Pandas, Streamlit,
            Flask, and FastAPI.
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            I am also currently learning Data Science, Machine Learning with
            Scikit-learn, and TensorFlow.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4 mt-8">
            <SocialLink
              href="https://github.com/Ameerusa86"
              icon={<FaGithub />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/ameer86/"
              icon={<FaLinkedin />}
              label="LinkedIn"
            />
            <SocialLink
              href="/contact"
              icon={<FaEnvelope />}
              label="Contact Me"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-transform transform hover:-translate-y-1"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-lg">{label}</span>
    </a>
  );
};

export default AboutMe;
