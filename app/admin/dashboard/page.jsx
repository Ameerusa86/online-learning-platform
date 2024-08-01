"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CoursesDashboard from "./components/CoursesDashboard";
import UsersDashboard from "./components/UsersDashboard";
import CodingTutorialsDashboard from "./components/CodingTutorialsDashboard";
import TechnologiesDashboard from "./components/TechnologiesDashboard";
import CategoriesDashboard from "./components/CategoriesDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "courses":
        return <CoursesDashboard />;
      case "users":
        return <UsersDashboard />;
      case "codingTutorials":
        return <CodingTutorialsDashboard />;
      case "technologies":
        return <TechnologiesDashboard />;
      case "categories":
        return <CategoriesDashboard />;
      default:
        return <CoursesDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 bg-gray-100">{renderActiveTab()}</main>
    </div>
  );
};

export default Dashboard;
