"use client";

import { useState } from "react";
import Navlinks from "@/constants/Navlinks";
import { X, MenuIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7 },
  };

  const navVariants = {
    hidden: { x: "-100%" },
    visible: { x: "0%" },
  };

  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <MenuIcon
          onClick={handleOpen}
          className="h-6 w-6 text-white hover:text-teal-400 transition cursor-pointer"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 bg-black z-[10000] w-full h-full"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleClose}
            />

            <motion.div
              className="fixed top-0 left-0 h-full bg-gray-900 z-[10001] w-[80%] sm:w-[60%] flex flex-col justify-center space-y-6 text-white"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <X
                onClick={handleClose}
                className="absolute top-4 right-4 sm:w-8 sm:h-8 w-6 h-6 cursor-pointer"
              />
              <div className="md:block hidden">
                <Image
                  className="rounded-full mx-auto border-4 border-teal-400"
                  src={""}
                  width={85}
                  height={85}
                  alt="Profile"
                />
                <h1 className="block text-center py-4 text-2xl">"User Name"</h1>
                <p className="block text-center py-4 text-lg">"Email"</p>
              </div>
              {Navlinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="block text-center py-4 text-2xl"
                  onClick={handleClose}
                >
                  <motion.h1
                    className="nav__link text-[20px] ml-12 pb-2 sm:text-[30px] whitespace-nowrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.title}
                  </motion.h1>
                </Link>
              ))}
              {/* {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="block text-center py-4 text-2xl"
                  onClick={handleClose}
                >
                  <motion.h1
                    className="nav__link text-[20px] ml-12 pb-2 sm:text-[30px] whitespace-nowrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Dashboard
                  </motion.h1>
                </Link>
              )} */}
              <div className="mx-auto">sign out</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
