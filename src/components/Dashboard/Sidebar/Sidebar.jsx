import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { AiTwotoneHome } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsGraphUp } from "react-icons/bs";
import { FaListAlt, FaBolt, FaUserShield, FaUsersCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlinePayment } from "react-icons/md";
import AdminMenu from "./Menu/AdminMenu";
import useRole from "../../../hooks/useRoll";
import StaffMenu from "./Menu/StaffMenu";
import CitizenMenu from "./Menu/CitizenMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const location = useLocation();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <p>Loading...</p>;

  const handleToggle = () => {
    setActive(!isActive);
  };

  const isActiveLink = (path) =>
    location.pathname === path ? "bg-white text-green-600" : "";

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white flex justify-between md:hidden shadow-lg">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <h2 className="text-2xl font-extrabold tracking-wide">ReportHub</h2>
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-green-600"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 fixed top-0 left-0 h-screen w-64 md:w-16 bg-gradient-to-b from-green-500 to-blue-600 text-white flex flex-col justify-between items-center py-6 shadow-xl
        ${isActive ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="hidden md:block mb-6 text-xl font-extrabold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        >
          <AiTwotoneHome />
        </Link>

        {/* Menu Icons */}
        <div className="flex flex-col gap-6">
          <Link
            to="/dashboard"
            className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
              "/dashboard"
            )}`}
            title="Dashboard Overview"
          >
            <BsGraphUp className="w-5 h-5" />
          </Link>

          {/* note:citizen */}
          {role === "citizen" && <CitizenMenu />}

          {/* note:staff */}
          {role === "staff" && <StaffMenu />}

          {/* note:admin */}
          {role === "admin" && <AdminMenu />}
        </div>

        {/* Logout */}
        <button
          onClick={logOut}
          className="p-3 rounded-lg hover:bg-white hover:text-red-600 transition"
          title="Logout"
        >
          <GrLogout className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;