import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
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
  Legend,
  CartesianGrid,
} from "recharts";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports`
      );
      return res.data;
    },
  });
  const { data: citizens = [] } = useQuery({
    queryKey: ["citizens"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/citizen`
      );
      return res.data;
    },
  });

  const totalIssues = reports.length;
  const resolvedIssues = reports.filter((r) => r.status === "resolved").length;
  const pendingIssues = reports.filter((r) => r.status === "pending").length;
  const rejectedIssues = reports.filter((r) => r.status === "rejected").length;

  // Total Payment হিসাব
  const citizenPayments = citizens
    .filter((c) => c.status === "premium")
    .map(() => 1000);

  const issuePayments = reports
    .filter((r) => r.priority === "High" && r.boosted)
    .map(() => 100);

  const totalPayment = [...citizenPayments, ...issuePayments].reduce(
    (sum, amt) => sum + amt,
    0
  );

  const chartData = [
    { name: "Resolved", value: resolvedIssues },
    { name: "Pending", value: pendingIssues },
    { name: "Rejected", value: rejectedIssues },
  ];

  return (
    <Container>
      <h1 className="text-center text-3xl font-bold lg:mt-25">Dashbord</h1>
      <div className="mt-10 px-4 md:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-12">
              <StatCard
                icon={<MdReportProblem className="w-7 h-7 text-white" />}
                title="Total Issues"
                value={totalIssues}
                gradient="bg-gradient-to-r from-red-600 to-red-400"
              />
              <StatCard
                icon={<FaDollarSign className="w-7 h-7 text-white" />}
                title="Total Payment"
                value={totalPayment + " tk"}
                gradient="bg-gradient-to-r from-green-600 to-green-400"
              />

              <StatCard
                icon={<AiOutlineCheckCircle className="w-7 h-7 text-white" />}
                title="Resolved Issues"
                value={resolvedIssues}
                gradient="bg-gradient-to-r from-teal-600 to-teal-400"
              />
              <StatCard
                icon={<AiOutlineClockCircle className="w-7 h-7 text-white" />}
                title="Pending Issues"
                value={pendingIssues}
                gradient="bg-gradient-to-r from-yellow-600 to-yellow-400"
              />
              <StatCard
                icon={<AiOutlineCloseCircle className="w-7 h-7 text-white" />}
                title="Rejected Issues"
                value={rejectedIssues}
                gradient="bg-gradient-to-r from-gray-600 to-gray-400"
              />
              <StatCard
                icon={<FaUserAlt className="w-7 h-7 text-white" />}
                title="Total Users"
                value="10"
                gradient="bg-gradient-to-r from-purple-600 to-purple-400"
              />
            </div>

            {/* ✅ Recharts Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Issue Status Overview
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

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

export default AdminStatistics;
