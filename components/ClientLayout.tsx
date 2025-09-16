"use client";

import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer";
import { useIsDashboard } from "@/app/hooks/useIsDashboard";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDashboard = useIsDashboard();

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard ? (
        <div className="flex-grow mt-[7vh]">{children}</div>
      ) : (
        <div className="flex-grow ">{children}</div>
      )}
      {!isDashboard && <Footer />}
    </>
  );
}
