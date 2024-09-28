"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-8 border-t-2 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold">Code with Ameer</h1>
            <p className="text-sm">Developed By: Ameer Hasan © 2024.</p>
          </motion.div>
          <motion.ul
            className="flex space-x-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/"
              className="hover:text-pink-300 transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              href="/courses"
              className="hover:text-pink-300 transition-colors duration-300"
            >
              Courses
            </Link>

            <Link
              href="/about"
              className="hover:text-pink-300 transition-colors duration-300"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-pink-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </motion.ul>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
