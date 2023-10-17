import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-4 py-6 lg:px-8 bg-accent_primary text-accent_secondary">
      <Link to="/">
        <h1 className="text-xl font-semibold cursor-pointer lg:text-2xl">
          Teacher-Review-System
        </h1>
      </Link>
    </nav>
  );
};

export default NavBar;
