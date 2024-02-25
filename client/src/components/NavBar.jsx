import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import isJwtValid from "@/utils/isJwtValid";
import SideNav from "./SideNav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 z-10 flex items-center justify-between w-full p-4 lg:px-8 bg-accent_primary text-accent_primary">
      <Link
        to="/"
        className="flex items-center gap-2 px-2 py-1 transition bg-white rounded-md shadow-md hover:bg-gray-100"
      >
        <img src="/scool.png" alt="" className="w-9" />

        <h1 className="text-lg font-bold cursor-pointer lg:text-xl">
          Teacher Evaluation System
        </h1>
      </Link>

      <Sheet>
        {!localStorage.getItem("accessToken") ? null : (
          <SheetTrigger asChild>
            <AlignJustify className="block w-6 h-6 text-white cursor-pointer lg:hidden" />
          </SheetTrigger>
        )}

        {/* {localStorage.getItem("accessToken") &&
        !isJwtValid(localStorage.getItem("accessToken")) ? null : (
          <SheetTrigger asChild>
            <AlignJustify className="block w-6 h-6 text-white cursor-pointer lg:hidden" />
          </SheetTrigger>
        )} */}

        <SheetContent className="block font-primary bg-neutral_white lg:hidden">
          <div className="my-2">
            <SideNav active={0} />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavBar;
