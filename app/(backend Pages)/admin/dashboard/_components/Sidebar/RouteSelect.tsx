"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
  FiSettings,
  FiBell,
  FiFolder,
  FiBook,
} from "react-icons/fi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoCodeSlash } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";

export const RouteSelect = () => {
  const pathname = usePathname(); // Get the current route path

  return (
    <div className="space-y-1">
      <Route
        Icon={FiHome}
        selected={pathname === "/"}
        title="Front End"
        route="/"
      />
      <Route
        Icon={FiHome}
        selected={pathname === "/"}
        title="Dashboard"
        route="/admin/dashboard"
      />
      <Route
        Icon={FiUsers}
        selected={pathname === "/admin/dashboard/users"}
        title="Users"
        route="/admin/dashboard/users"
      />
      <Route
        Icon={FiBook}
        selected={pathname === "/admin/dashboard/courses"}
        title="Courses"
        route="/admin/dashboard/courses"
      />
      <Route
        Icon={IoCodeSlash}
        selected={pathname === "/admin/dashboard/tutorials"}
        title="Tutorials"
        route="/admin/dashboard/tutorials"
      />
      <Route
        Icon={BiSolidCategoryAlt}
        selected={pathname === "/admin/dashboard/categories"}
        title="Categories"
        route="/admin/dashboard/categories"
      />
      <Route
        Icon={GrTechnology}
        selected={pathname === "/admin/dashboard/technologies"}
        title="Technologies"
        route="/admin/dashboard/technologies"
      />
      <Route
        Icon={FiBell}
        selected={pathname === "/admin/dashboard/notifications"}
        title="Notifications"
        route="/admin/dashboard/notifications"
      />
      <Route
        Icon={FiSettings}
        selected={pathname === "/settings"}
        title="Settings"
        route="/settings"
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  route,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  route: string;
}) => {
  const router = useRouter(); // Initialize Next.js router

  const handleClick = () => {
    router.push(route); // Navigate to the provided route
  };

  return (
    <button
      aria-pressed={selected}
      className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ease-in-out relative overflow-hidden group ${
        selected
          ? "bg-teal-500 text-white shadow-md ring-1"
          : "bg-transparent text-stone-600 hover:bg-stone-100 hover:text-white"
      }`}
      onClick={handleClick}
    >
      <span
        className={`absolute inset-0 bg-teal-500 transition-all duration-300 ease-in-out transform ${
          selected ? "scale-x-100" : "scale-x-0"
        } origin-left group-hover:scale-x-100`}
      />
      <Icon
        className={`relative z-10 text-xl transition-colors duration-200 ${
          selected ? "text-white" : "text-stone-500 group-hover:text-white"
        }`}
      />
      <span className="relative z-10">{title}</span>
    </button>
  );
};
