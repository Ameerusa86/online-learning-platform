"use client";

import { useState } from "react";
import { FaBars, FaTimes, FaBook, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-800 text-white h-screen p-4"
    >
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: isCollapsed ? 0 : 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-white"
        >
          {!isCollapsed && "Dashboard"}
        </motion.h1>
        <button onClick={toggleCollapse} className="text-xl">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
      <ul className="mt-10">
        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mb-4 cursor-pointer flex items-center p-2 rounded transition-colors duration-300 ${
            activeTab === "courses" ? "bg-blue-600" : "hover:bg-blue-700"
          }`}
          onClick={() => setActiveTab("courses")}
        >
          <FaBook className="inline mr-2" />
          {!isCollapsed && "Courses"}
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mb-4 cursor-pointer flex items-center p-2 rounded transition-colors duration-300 ${
            activeTab === "users" ? "bg-blue-600" : "hover:bg-blue-700"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <FaUser className="inline mr-2" />
          {!isCollapsed && "Users"}
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
