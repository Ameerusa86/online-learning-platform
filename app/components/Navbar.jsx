"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { auth } from "@/utils/firebase";
import { FaBook, FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/auth");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="bg-blue-600 p-4 shadow-lg fixed w-full z-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-white text-xl font-bold"
        >
          <FaBook className="mr-2" />
          Online Learning Platform
        </Link>
        <div className="hidden md:flex space-x-4">
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
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/profile">
                {user.photoURL ? (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-gray-300"
                  >
                    <CgProfile size={24} />
                  </motion.div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className="text-white hover:text-gray-300 transition duration-300"
              href="/auth"
            >
              Login
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="md:hidden bg-blue-700"
        >
          <div className="flex flex-col items-center space-y-4 p-4">
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
            {user ? (
              <>
                <Link href="/profile">
                  {user.photoURL ? (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-gray-300"
                    >
                      <CgProfile size={24} />
                    </motion.div>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                href="/auth"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
