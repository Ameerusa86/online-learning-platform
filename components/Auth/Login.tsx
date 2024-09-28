"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Image from "next/image";
import { images } from "@/public/images";
import { motion } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

// Validation schema for the form
interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const router = useRouter();
  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Handle form submission and sign in the user
  const handleSignIn = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          // Redirect to home page after successful login
          router.push("/");
        }
      );
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-center w-full max-w-5xl h-auto lg:h-3/4 shadow-lg rounded-lg bg-input-dark"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Left Section - Animation */}
        <div className="hidden lg:flex flex-1 h-full items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={images.signInForm}
              alt="Login Animation"
              className="max-h-full rounded-xl"
            />
          </motion.div>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col justify-center flex-1 max-w-md w-full h-full p-10">
          <Image src={images.logo} className="h-24 w-24 mx-auto" alt="Logo" />
          <motion.h1
            className="text-2xl text-center font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Welcome to CodewithAmeer 👋
          </motion.h1>
          <motion.p
            className="text-gray-400 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Please sign-in to your account and start the adventure
          </motion.p>

          {/* Form using React Hook Form */}
          <motion.form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-white block mb-2">
                Email
              </Label>
              <input
                type="email"
                id="email"
                className="py-3 px-4 bg-input-dark text-white rounded-md focus:outline-none shadow-md w-full"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="text-white block mb-2">
                Password
              </Label>
              <input
                type="password"
                id="password"
                className="py-3 px-4 bg-input-dark text-white rounded-md focus:outline-none shadow-md w-full"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-btn-blue"
                />
                <span className="text-white">Remember me</span>
              </label>
              <a href="#" className="text-btn-blue hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              className="
                bg-btn-blue
                hover:bg-indigo-600
                text-white
                font-bold
                py-3
                rounded-md
                transition-transform transform hover:scale-105
              "
              type="submit"
            >
              Login
            </button>
          </motion.form>

          <motion.p
            className="text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            New on our platform?{" "}
            <Link
              href="/auth/register"
              className="text-btn-blue hover:underline"
            >
              Create an account
            </Link>
          </motion.p>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <a href="#" className="text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-400">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginComponent;
