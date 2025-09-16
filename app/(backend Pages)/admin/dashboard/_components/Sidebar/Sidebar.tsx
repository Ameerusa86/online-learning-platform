import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen justify-between p-4 bg-white shadow-lg rounded-lg">
      {/* Scrollable section */}
      <div className="overflow-y-auto sticky top-4 space-y-4">
        <AccountToggle />

        {/* <Search /> */}

        <RouteSelect />
      </div>

      {/* Bottom fixed section */}
      <div className="mt-4">{/* <Plan /> */}</div>
    </div>
  );
};
