// pages/admin/dashboard.js
"use client";
import { useState } from "react";
import withAdminProtection from "./components/withAdminProtection";
import Sidebar from "./components/Sidebar";
import CoursesDashboard from "./components/CoursesDashboard";
import UsersDashboard from "./components/UsersDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "courses" && <CoursesDashboard />}
        {activeTab === "users" && <UsersDashboard />}
      </div>
    </div>
  );
};

export default withAdminProtection(Dashboard);
