"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-blue-800 py-4 text-center text-white"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-left">
            <h5 className="text-lg font-bold">Online Learning Platform</h5>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link
              className="text-white hover:text-gray-300 transition duration-300"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition duration-300"
              href="/courses"
            >
              Courses
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition duration-300"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition duration-300"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link
              className="text-white hover:text-gray-300 transition duration-300 flex items-center"
              href="https://www.linkedin.com"
              passHref
              target="_blank"
            >
              <FaLinkedinIn size={20} />
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition duration-300 flex items-center"
              href="https://github.com/Ameerusa86"
              passHref
              target="_blank"
            >
              <FaGithub size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
