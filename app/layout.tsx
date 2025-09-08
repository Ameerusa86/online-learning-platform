import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LMS",
  description: "Learn anything, beautifully.",
  metadataBase: new URL("https://lms-edu.vercel.app"),
  openGraph: {
    title: "LMS",
    description: "Learn anything, beautifully.",
    url: "https://lms-edu.vercel.app",
    siteName: "LMS",
    images: [
      {
        url: "/Images/img-2.png",
        width: 1200,
        height: 630,
        alt: "LMS",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
