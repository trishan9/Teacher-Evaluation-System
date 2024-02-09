"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="p-6 sticky top-0 left-0 w-full bg-slate-200 z-50 flex justify-between font-primary items-center">
      <h1 className="font-semibold text-lg">
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
      </div>
    </nav>
  );
};

export default Navbar;
