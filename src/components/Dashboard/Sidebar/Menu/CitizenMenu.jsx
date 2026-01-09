import { GrUserWorker } from "react-icons/gr";
import { FaBolt, FaListAlt, FaUserShield } from "react-icons/fa";
import { Link } from "react-router";
import { CgProfile } from "react-icons/cg";

const CitizenMenu = () => {
  const isActiveLink = (path) =>
    location.pathname === path ? "bg-white text-green-600" : "";
  return (
    <>
      <Link
        to="/dashboard/my-issues"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/issues"
        )}`}
        title="My Issues"
      >
        <FaListAlt className="w-5 h-5" />
      </Link>

      <Link
        to="/dashboard/report-issue"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/report"
        )}`}
        title="Report Issue"
      >
        <FaBolt className="w-5 h-5" />
      </Link>
      {/* profile- citizen------ */}
      <Link
        to="/dashboard/cityzen-profile"
        className={`p-3 rounded-lg hover:bg-white hover:text-green-600 transition ${isActiveLink(
          "/dashboard/report"
        )}`}
        title="Profile"
      >
        <CgProfile className="w-5 h-5" />
      </Link>
    </>
  );
};

export default CitizenMenu;
