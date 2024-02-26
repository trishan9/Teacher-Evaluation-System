import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./_components/navbar";
import TanstackProvider from "@/components/providers/TanstackProvider";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-primary" });

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
      <body className={dmSans.variable}>
        <Navbar />
        <TanstackProvider>{children}</TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}
