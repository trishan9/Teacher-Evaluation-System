import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="p-6 sticky top-0 left-0 w-full bg-slate-200 z-50 flex justify-between">
      <h1 className="font-semibold text-lg">Admin Panel</h1>
      <div>
        <Button variant="outline" className="ml-4">
          <Link href='/'>Create School</Link>
        </Button>
        <Button variant="outline" className="ml-4">
        <Link href='/manage-school'>Manage School</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
