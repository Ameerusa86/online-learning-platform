// components/Login.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        "There was an issue with your login credentials. Please try again."
      );
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      router.push("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with GitHub!");
      router.push("/");
    } catch (error) {
      console.error("GitHub Login Error:", error);
      toast.error("GitHub login failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white p-8 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={toggleForm}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Create an account
          </button>
        </div>
      </form>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <FaGoogle />
          <span>Google</span>
        </button>
        <button
          onClick={handleGithubLogin}
          className="flex items-center space-x-2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          <FaGithub />
          <span>GitHub</span>
        </button>
      </div>
    </motion.div>
  );
}
