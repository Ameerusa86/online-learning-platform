import { K2D } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

const k2d = K2D({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={k2d.className}>
        <Toaster />
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <ProtectedRoute>
              <main className="flex-grow mt-16">{children}</main>
            </ProtectedRoute>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
