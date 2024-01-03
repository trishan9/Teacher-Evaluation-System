import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 z-10 flex items-center justify-between w-full p-4 lg:px-8 bg-accent_primary text-accent_primary">
      <Link to="/dashboard/surveys" className="flex items-center gap-2 px-2 py-1 transition bg-white rounded-md shadow-md hover:bg-gray-100">
        <img src="/scool.png" alt="" className="w-9" />

        <h1 className="text-lg font-bold cursor-pointer lg:text-xl">
          SCOOL
        </h1>
      </Link>

      <Link to="https://innovisionx-tech.web.app/" target="_blank">
        <img src="/logo.png" alt="" className="w-8 rounded-sm" />
      </Link>

    </nav>
  );
};

export default NavBar;
