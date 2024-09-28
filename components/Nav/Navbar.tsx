"use client";

import React from "react";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "@/constants/Navlinks";
import Spinner2 from "../spinner2";
import { useAuth } from "@/app/hooks/useAuth";
import { images } from "@/public/images";
import UserMenu from "../Auth/UserMenu";

const Navbar: React.FC = () => {
  const user = useAuth(); // Get the authenticated user

  return (
    <header
      id="navbar"
      className="top-0 left-0 fixed w-full transition-all duration-200 h-[7vh] z-[10000] bg-gray-900 text-white shadow-md"
    >
      <div className="flex items-center justify-between h-full w-[90%] xl:w-[80%] mx-auto">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="hover:text-teal-400 transition flex items-center"
          >
            <Image src={"/logo.png"} width={85} height={85} alt="Logo" />
            CodewithAmeer
          </Link>
        </div>

        {/* Menu Section */}
        <nav className="hidden lg:flex items-center space-x-10">
          {Navlinks.map((link, index) => (
            <Link key={index} href={link.url} className="nav__link">
              {link.title}
            </Link>
          ))}
          {/* Conditionally add "Dashboard" link for admin users */}
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {user ? (
            <UserMenu />
          ) : (
            // <Link href="/profile" className="flex items-center space-x-2">
            //   <Image
            //     src={images.defaultUser || user.photoURL} // You can fetch the user's photoURL from Firebase, or use a default placeholder image.
            //     alt="Profile Image"
            //     width={40}
            //     height={40}
            //     className="rounded-full"
            //   />
            // </Link>

            <Button
              variant="outline"
              className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white transition"
            >
              <Link href={"/auth/signin"}>Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;
