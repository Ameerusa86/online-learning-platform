"use client";

import { useState } from "react";
import { FaBars, FaTimes, FaBook, FaUser, FaCode } from "react-icons/fa";
import { GiRadarSweep } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";

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
            activeTab === "codingTutorials" && "bg-blue-600 p-2 rounded"
          }`}
          onClick={() => setActiveTab("codingTutorials")}
        >
          <FaCode className="inline mr-2" />
          {!isCollapsed && "Coding Tutorials"}
        </li>
        <li
          className={`mb-4 cursor-pointer ${
            activeTab === "categories" && "bg-blue-600 p-2 rounded"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          <TbCategoryFilled className="inline mr-2" />
          {!isCollapsed && "Categories"}
        </li>
        <li
          className={`mb-4 cursor-pointer ${
            activeTab === "technologies" && "bg-blue-600 p-2 rounded"
          }`}
          onClick={() => setActiveTab("technologies")}
        >
          <GiRadarSweep className="inline mr-2" />
          {!isCollapsed && "Technologies"}
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
