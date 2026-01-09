import { MdReportProblem } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Container from "../../Shared/Container";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth";

const StaffDashboard = () => {
   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch assigned issues for this staff
  const { data: assignedIssues = [], isLoading } = useQuery({
    queryKey: ["assigned-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports/assigned/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // ✅ Extract staff info from first issue
  const currentStaff = assignedIssues[0]?.assignedStaff;

  // ✅ Stats
  const assignedCount = assignedIssues.length;
  const resolvedCount = assignedIssues.filter(
    (r) => r.status === "resolved"
  ).length;
  const inProgressCount = assignedIssues.filter(
    (r) => r.status === "in-progress"
  ).length;

  const today = new Date().toISOString().split("T")[0];
  const todaysTasks = assignedIssues.filter(
    (r) => r.assignedAt?.split("T")[0] === today
  ).length;

  const chartData = [
    { name: "Assigned", value: assignedCount },
    { name: "Resolved", value: resolvedCount },
    { name: "In Progress", value: inProgressCount },
  ];

  return (
    <Container>
      <h1 className="text-center text-3xl font-bold lg:mt-10">
        Staff Dashboard
      </h1>

      {/* ✅ Staff Info */}
      {currentStaff && (
        <div className="flex items-center gap-4 mt-6 mb-10 px-4 md:px-8">
          <img
            src={currentStaff.photo || "https://i.ibb.co/9mdY3skF/staff.jpg"}
            alt={currentStaff.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {currentStaff.name}
            </h2>
            <p className="text-sm text-gray-600">{currentStaff.email}</p>
          </div>
        </div>
      )}

      {/* ✅ Stats Cards */}
      <div className="mt-4 px-4 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatCard
            icon={<MdReportProblem className="w-7 h-7 text-white" />}
            title="Assigned Issues"
            value={assignedCount}
            gradient="bg-gradient-to-r from-blue-600 to-blue-400"
          />
          <StatCard
            icon={<AiOutlineCheckCircle className="w-7 h-7 text-white" />}
            title="Resolved Issues"
            value={resolvedCount}
            gradient="bg-gradient-to-r from-teal-600 to-teal-400"
          />
          <StatCard
            icon={<AiOutlineClockCircle className="w-7 h-7 text-white" />}
            title="In Progress"
            value={inProgressCount}
            gradient="bg-gradient-to-r from-yellow-600 to-yellow-400"
          />
          <StatCard
            icon={<MdReportProblem className="w-7 h-7 text-white" />}
            title="Today's Tasks"
            value={todaysTasks}
            gradient="bg-gradient-to-r from-purple-600 to-purple-400"
          />
        </div>

        {/* ✅ Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Issue Statistics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
};

// ✅ Reusable Stat Card
const StatCard = ({ icon, title, value, gradient }) => (
  <div className="flex flex-col justify-between bg-white rounded-xl shadow-lg p-6 border-t-4 transition hover:scale-[1.02] duration-300">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`h-14 w-14 rounded-full grid place-items-center text-white text-xl ${gradient}`}
      >
        {icon}
      </div>
    </div>
    <div className="text-left">
      <p className="text-lg font-semibold text-gray-700">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-1">{value}</h2>
    </div>
  </div>
);

export default StaffDashboard;
