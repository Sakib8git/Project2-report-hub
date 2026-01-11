import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="relative bg-base-300 min-h-screen md:flex ">
        {/* Left Side: Sidebar Component */}
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1   md:ml-64">
          <div className="p-4 ">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
