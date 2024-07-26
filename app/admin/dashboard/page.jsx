"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaTh,
} from "react-icons/fa";

import CoursesDashboard from "./components/CoursesDashboard";
import UsersDashboard from "./components/UsersDashboard";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("courses");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <motion.aside
        initial={{ width: isSidebarOpen ? 240 : 64 }}
        animate={{ width: isSidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-800 text-white"
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          {isSidebarOpen ? (
            <span className="text-xl font-bold">Dashboard</span>
          ) : (
            <FaTh size={24} />
          )}
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <nav className="p-4">
          <button
            onClick={() => setSelectedSection("courses")}
            className="flex items-center w-full p-2 mb-2 text-left hover:bg-blue-700 rounded"
          >
            <FaBook className="mr-2" />
            {isSidebarOpen && <span>Courses</span>}
          </button>
          <button
            onClick={() => setSelectedSection("users")}
            className="flex items-center w-full p-2 mb-2 text-left hover:bg-blue-700 rounded"
          >
            <FaUser className="mr-2" />
            {isSidebarOpen && <span>Users</span>}
          </button>
        </nav>
      </motion.aside>
      <main className="flex-grow p-8">
        {selectedSection === "courses" && <CoursesDashboard />}
        {selectedSection === "users" && <UsersDashboard />}
      </main>
    </div>
  );
}
