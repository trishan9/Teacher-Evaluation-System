import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Navbar from "./_components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-primary" });

export const metadata: Metadata = {
  title: "Admin Panel | Scool",
  description:
    "This is Admin Panel of Scool where Super Admins create Schools or College account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(inter.className, inter.variable)}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
