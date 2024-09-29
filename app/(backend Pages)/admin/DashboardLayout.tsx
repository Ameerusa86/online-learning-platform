"use client";

import { Sidebar } from "./dashboard/_components/Sidebar/Sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100  mt-28">
      <div className="sm:flex sm:justify-center mx-auto">
        <Sidebar />
        {/* Main content */}
        <main className="w-full bg-white p-6 shadow-lg rounded-md">
          {children}
        </main>
      </div>
    </div>
  );
}
