// components/Navbar.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { auth } from "@/utils/firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="bg-blue-600 p-4 shadow-lg flex justify-between items-center"
    >
      <Link className="text-white text-xl font-bold" href="/">
        Online Learning Platform
      </Link>
      <div>
        <Link className="text-white mr-4" href="/profile">
          Profile
        </Link>
        {user ? (
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        ) : (
          <Link className="text-white" href="/auth/login">
            Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
