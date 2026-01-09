import { FaListAlt, FaUserShield, FaUsersCog } from "react-icons/fa";

import { Link } from "react-router";
import { MdOutlinePayment } from "react-icons/md";
import { FcSettings } from "react-icons/fc";

const AdminMenu = () => {
  const isActiveLink = (path) =>
    location.pathname === path ? "bg-white text-green-600" : "";
  return (
    <>
      <Link
        to="/dashboard/admin-issues"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/all-issues"
        )}`}
        title="All Issues"
      >
        <FaListAlt className="w-5 h-5" />
      </Link>

      <Link
        to="/dashboard/manage-users"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/manage-users"
        )}`}
        title="Manage Users"
      >
        <FaUsersCog className="w-5 h-5" />
      </Link>

      <Link
        to="/dashboard/manage-staff"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/manage-staff"
        )}`}
        title="Manage Staff"
      >
        <FaUserShield className="w-5 h-5" />
      </Link>

      <Link
        to="/dashboard/payments"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/payments"
        )}`}
        title="Payments"
      >
        <MdOutlinePayment className="w-5 h-5" />
      </Link>

      <Link
        to="/dashboard/profile"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/profile"
        )}`}
        title="Profile"
      >
        <FcSettings className="w-5 h-5" />
      </Link>
    </>
  );
};

export default AdminMenu;
