// app/auth/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import Login from "./AuthComponents/login";
import Register from "./AuthComponents/register";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isMounted) return null;

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-bg-100">
      <Toaster />
      {isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Register toggleForm={toggleForm} />
      )}
    </div>
  );
}
