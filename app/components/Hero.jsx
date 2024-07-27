// components/HeroSection.js
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-100 py-16 relative">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4">
            Learn <span className="text-teal-500">Anything</span> Anytime
          </h1>
          <p className="text-gray-600 mb-6">
            Discover the best courses for a variety of subjects, taught by
            industry experts.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link
              className="inline-block bg-blue-500 text-white py-3 px-6 rounded-md shadow hover:bg-blue-600 transition duration-300"
              href="/courses"
            >
              Explore Courses
            </Link>
            {/* <a
              href="#"
              className="inline-block text-gray-800 py-3 px-6 rounded-md shadow hover:text-gray-600 transition duration-300"
            >
              DISCOVER MORE
            </a> */}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 mt-10 md:mt-0 flex justify-center"
        >
          <Image
            src="/images/girl3.png"
            alt="Hero Image"
            width={1200}
            height={1200}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-0 right-0 w-1/3 h-full bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      ></motion.div>
    </section>
  );
};

export default HeroSection;
