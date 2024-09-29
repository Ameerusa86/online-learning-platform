"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Use router to redirect after logout
import { useAuth } from "@/app/hooks/useAuth";
import { images } from "@/public/images";

export const AccountToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Use router for navigation
  const user = useAuth(); // Get user from useAuth hook

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button
        className="flex p-2 hover:bg-stone-100 rounded-lg transition-all duration-200 ease-in-out relative gap-3 w-full items-center"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <img
          src={
            user?.photoURL ||
            (typeof images.defaultUser === "string"
              ? images.defaultUser
              : images.defaultUser.src)
          }
          alt="avatar"
          className="w-10 h-10 rounded-full shrink-0 object-cover bg-violet-500 shadow-lg"
        />
        <div className="flex-1 flex flex-col text-start">
          <span className="text-base font-semibold block text-stone-800">
            {user?.name || "User"}
          </span>
          <span className="text-sm block text-stone-500">{user?.email}</span>
        </div>

        {isOpen ? (
          <FiChevronUp className="text-lg text-stone-500 transition-transform duration-300" />
        ) : (
          <FiChevronDown className="text-lg text-stone-500 transition-transform duration-300" />
        )}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {isOpen && (
          <div className="mt-2 bg-white shadow-lg rounded-lg p-4">
            <ul className="space-y-2">
              <li className="text-sm text-stone-700 hover:bg-stone-100 p-2 rounded transition-all cursor-pointer">
                Account Settings
              </li>
              <li className="text-sm text-stone-700 hover:bg-stone-100 p-2 rounded transition-all cursor-pointer">
                Profile
              </li>
              <li
                className="text-sm text-stone-700 hover:bg-stone-100 p-2 rounded transition-all cursor-pointer"
                onClick={() => {}} // Attach logout function to button
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
