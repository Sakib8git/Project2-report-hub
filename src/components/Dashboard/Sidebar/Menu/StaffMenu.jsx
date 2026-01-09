import { GrUserWorker } from "react-icons/gr";
import {  FaUserShield } from "react-icons/fa";
import { Link } from "react-router";

const StaffMenu = () => {
  const isActiveLink = (path) =>
    location.pathname === path ? "bg-white text-green-600" : "";
  return (
    <>
      <Link
        to="/dashboard/staff-profile"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/report"
        )}`}
        title="Profile"
      >
        <GrUserWorker className="w-5 h-5" />
      </Link>

      <Link
        to="/dashboard/assigned-issues"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/assign-issues"
        )}`}
        title="Assign Issues"
      >
        <FaUserShield className="w-5 h-5" />
      </Link>
    </>
  );
};

export default StaffMenu;
