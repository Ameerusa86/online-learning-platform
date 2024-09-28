"use client";

import React, { useState } from "react";
import { FiCommand, FiSearch } from "react-icons/fi";
import { CommandMenu } from "./CommandMenu";

export const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-stone-100 mb-4 relative rounded-full flex items-center px-3 py-2 text-sm shadow-sm hover:shadow-md transition-shadow">
        <FiSearch className="mr-2 text-stone-500" />
        <input
          onFocus={(e) => {
            e.target.blur(); // Prevent input focus and open command menu
            setOpen(true);
          }}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />

        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-white rounded-full shadow-sm absolute right-3 top-1/2 -translate-y-1/2 text-stone-600">
          <FiCommand />
          <span>K</span>
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};
