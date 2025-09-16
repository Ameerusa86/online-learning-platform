"use client";

import Image from "next/image";
import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="">
      <motion.section
        className="z-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 ">
          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight">
              Master <span className="text-teal-400">Coding</span> from the
              Comfort of Your Home
            </h1>
            <p className="text-lg text-gray-300">
              Join our interactive online coding platform and become a
              full-stack developer in no time. Learn at your own pace with
              expert guidance.
            </p>
            <div className="flex space-x-4">
              <Link href={"/courses"} className="flex items-center group">
                <Button
                  variant="default"
                  className="px-6 py-6 bg-teal-500 hover:bg-teal-600"
                >
                  Explore Courses <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Image
              src="/girl3.png"
              alt="Coding"
              width={500}
              height={500}
              className="object-cover rounded-lg w-full h-full bottom-0 right-0"
              priority
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Hero;
