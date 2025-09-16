"use client";

import React, { useEffect, useState } from "react";
import { firestore } from "@/utils/firebase"; // Assuming your Firebase utils are configured here
import { collection, getDocs } from "firebase/firestore";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import Spinner2 from "@/components/spinner2";

export const StatCards = () => {
  const [courseCount, setCourseCount] = useState<number | null>(null);
  const [tutorialCount, setTutorialCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    // Function to fetch data for each collection
    const fetchCounts = async () => {
      try {
        // Fetch courses count
        const coursesSnapshot = await getDocs(collection(firestore, "courses"));
        setCourseCount(coursesSnapshot.size);

        // Fetch tutorials count
        const tutorialsSnapshot = await getDocs(
          collection(firestore, "tutorials")
        );
        setTutorialCount(tutorialsSnapshot.size);

        // Fetch users count
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        setUserCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <Card
        title="Courses"
        value={courseCount !== null ? `${courseCount}` : <Spinner2 />}
        gradient="from-purple-500 to-purple-700"
      />
      <Card
        title="Tutorials"
        value={tutorialCount !== null ? `${tutorialCount}` : <Spinner2 />}
        gradient="from-blue-500 to-blue-700"
      />
      <Card
        title="Users"
        value={userCount !== null ? `${userCount}` : <Spinner2 />}
        gradient="from-green-500 to-green-700"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  gradient,
}: {
  title: string;
  value: React.ReactNode;
  gradient: string;
}) => {
  return (
    <div
      className={`col-span-4 p-4 rounded-lg bg-gradient-to-r ${gradient} text-white `}
    >
      <div className="flex items-center justify-center">
        <div className="flex-col items-center justify-center">
          <h3 className="text-white text-xl font-bold">
            {title}: {value}
          </h3>
        </div>

        {/* <span
          className={text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span> */}
      </div>

      {/* <p className="text-xs text-stone-500">{period}</p> */}
    </div>
  );
};
