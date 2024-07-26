"use client";

// components/Footer.js
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-white fixed inset-x-0 bottom-0 shadow-lg"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-left mb-4 md:mb-0">
            <h5 className="text-2xl font-bold">Online Learning Platform</h5>
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Home
              </motion.span>
            </Link>
            <Link href="/courses">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Courses
              </motion.span>
            </Link>
            <Link href="/about">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                About
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Contact
              </motion.span>
            </Link>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="https://www.linkedin.com">
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              <FaLinkedinIn size={24} />
            </motion.span>
          </Link>
          <Link href="https://github.com/Ameerusa86">
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              <FaGithub size={24} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
