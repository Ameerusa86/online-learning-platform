"use client";

import { useState } from "react";
import { FaBars, FaTimes, FaBook, FaUser } from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`bg-blue-800 text-white p-4 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-width duration-300`}
    >
      <div className="flex items-center justify-between">
        <h1
          className={`${
            isCollapsed ? "hidden" : "block"
          } text-2xl font-bold text-white`}
        >
          Dashboard
        </h1>
        <button onClick={toggleCollapse} className="text-xl">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
      <ul className="mt-10">
        <li
          className={`mb-4 cursor-pointer ${
            activeTab === "courses" && "bg-blue-600 p-2 rounded"
          }`}
          onClick={() => setActiveTab("courses")}
        >
          <FaBook className="inline mr-2" />
          {!isCollapsed && "Courses"}
        </li>
        <li
          className={`mb-4 cursor-pointer ${
            activeTab === "users" && "bg-blue-600 p-2 rounded"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <FaUser className="inline mr-2" />
          {!isCollapsed && "Users"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
