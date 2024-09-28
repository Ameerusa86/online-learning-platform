"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import Spinner2 from "../spinner2";
import { images } from "@/public/images";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

const UserMenu = () => {
  const user = useAuth(); // Get the authenticated user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {user ? (
          <Image
            src={user.photoURL || images.defaultUser}
            height={50}
            width={50}
            className="hidden md:block rounded-full cursor-pointer border-2 border-teal-500 hover:border-teal-700 transition-all"
            alt="Profile Image"
          />
        ) : (
          <Spinner2 />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 bg-white text-gray-900 rounded-lg shadow-lg mr-8 mt-8">
        <DropdownMenuLabel className="text-lg font-semibold text-teal-600">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 border-teal-300" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="dropdown-item flex items-center justify-center rounded-md p-2 transition-colors font-bold">
            {user?.name || "User"}
          </DropdownMenuItem>
          <DropdownMenuItem className="dropdown-item flex items-center justify-center rounded-md p-2 transition-colors">
            {user?.email || "Email"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2 border-teal-300" />
        <DropdownMenuGroup>
          <Link href="/auth/profile">
            <DropdownMenuItem className="dropdown-item flex items-center justify-between rounded-md p-2 transition-colors">
              Profile
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="dropdown-item flex items-center justify-between rounded-md p-2 transition-colors">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2 border-teal-300" />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="dropdown-item flex items-center justify-between rounded-md p-2 transition-colors">
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-white text-gray-900 rounded-lg shadow-lg">
                <DropdownMenuItem className="dropdown-item hover:bg-teal-100 hover:text-teal-900 rounded-md p-2 transition-colors">
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem className="dropdown-item hover:bg-teal-100 hover:text-teal-900 rounded-md p-2 transition-colors">
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 border-teal-300" />
                <DropdownMenuItem className="dropdown-item hover:bg-teal-100 hover:text-teal-900 rounded-md p-2 transition-colors">
                  More...
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2 border-teal-300" />
        <Link href="https://github.com/Ameerusa86" target="_blank">
          <DropdownMenuItem className="dropdown-item hover:bg-teal-100 hover:text-teal-900 rounded-md p-2 transition-colors">
            GitHub
          </DropdownMenuItem>
        </Link>
        <Link href="https://www.linkedin.com/in/ameer86/" target="_blank">
          <DropdownMenuItem className="dropdown-item hover:bg-teal-100 hover:text-teal-900 rounded-md p-2 transition-colors">
            LinkedIn
          </DropdownMenuItem>
        </Link>
        <Link className="hover:bg-teal-100 hover:text-teal-900" href="/contact">
          <DropdownMenuItem className="dropdown-item hover:bg-teal-100 hover:text-teal-900 rounded-md p-2 transition-colors">
            Support
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="my-2 border-teal-300" />

        <DropdownMenuItem className="dropdown-item flex items-center justify-between hover:bg-red-100 hover:text-red-900 rounded-md p-2 transition-colors">
          <Button
            onClick={() => {
              signOut(auth);
            }}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
