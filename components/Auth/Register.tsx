"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth"; // Firebase method for user registration
import { addDoc, collection } from "firebase/firestore"; // Ensure you're using the correct Firestore imports
import { auth, firestore } from "@/utils/firebase"; // Ensure correct imports for auth and firestore
import Image from "next/image";
import { images } from "@/public/images";
import { motion } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import SocialAuth from "./SocialAuth";

// Validation schema for the form
interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterComponent = () => {
  const router = useRouter();
  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const password = watch("password"); // Watch password for confirmation validation

  // Handle form submission and register the user
  const handleRegister = async (data: RegisterFormInputs) => {
    const { fullName, email, password } = data;
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Use updateProfile function to set displayName
      await updateProfile(user, {
        displayName: fullName, // Set the display name to the full name
      });

      // Add user data to Firestore
      const usersRef = collection(firestore, "users");
      await addDoc(usersRef, {
        uid: user.uid,
        fullName: fullName, // Store fullName from form input
        email: user.email,
        name: fullName, // Save the fullName as the 'name'
        photoURL: user.photoURL || "", // Use empty string if photoURL is null
      });

      console.log("User successfully registered and added to Firestore");

      // Redirect to home page after successful registration
      router.push("/");
    } catch (error) {
      console.error("Failed to register:", error);
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
              src={images.signUpForm}
              alt="Sign Up Animation"
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
            Join CodewithAmeer 👋
          </motion.h1>
          <motion.p
            className="text-gray-400 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Please create your account to start the adventure
          </motion.p>

          {/* Form using React Hook Form */}
          <motion.form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Full Name Input */}
            <div>
              <Label htmlFor="fullName" className="text-white block mb-2">
                Full Name
              </Label>
              <input
                type="text"
                id="fullName"
                className="py-3 px-4 bg-input-dark text-white rounded-md focus:outline-none shadow-md w-full"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required",
                })}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

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
                    value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i,
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

            {/* Confirm Password Input */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-white block mb-2"
              >
                Confirm Password
              </Label>
              <input
                type="password"
                id="confirmPassword"
                className="py-3 px-4 bg-input-dark text-white rounded-md focus:outline-none shadow-md w-full"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Register Button */}
            <button
              className="bg-btn-blue hover:bg-indigo-600 text-white font-bold py-3 rounded-md transition-transform transform hover:scale-105"
              type="submit"
            >
              Sign Up
            </button>
          </motion.form>

          <motion.p
            className="text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Already have an account?{" "}
            <a href="/auth/signin" className="text-btn-blue hover:underline">
              Sign In
            </a>
          </motion.p>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="#" className="text-gray-400">
              <SocialAuth />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterComponent;
