"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 left-0 z-50 flex items-center justify-between w-full p-6 bg-slate-200 font-primary">
      <h1 className="text-lg font-semibold">
        <Link href="/">Admin Panel</Link>
      </h1>

      <div>
        <Link href="/">
          <Button
            variant={pathname === "/" ? "outline" : "ghost"}
            className="ml-4"
          >
            Create School
          </Button>
        </Link>
        <Link href="/manage-school">
          <Button
            variant={
              pathname === "/manage-school" ||
              pathname.startsWith("/manage-school")
                ? "outline"
                : "ghost"
            }
            className="ml-4"
          >
            Manage Schools
          </Button>
        </Link>
        c
      </div>
    </nav>
  );
};

export default Navbar;
