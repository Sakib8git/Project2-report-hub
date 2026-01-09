import { MdReportProblem } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

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
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CitizenStatistics = () => {
  const { user } = useAuth();
  // console.log(user.email);
  const axiosSecure = useAxiosSecure();

  // Fetch reports only for logged-in citizen
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["citizenReports", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports`
      );

      // filter by reporter.email
      // return res.data.filter((r) => r.reporter?.email === "worksakib30@gmail.com");
      return res.data.filter((r) => r.reporter?.email === user?.email);
    },
    enabled: !!user?.email,
  });

  // Stats calculation
  const totalIssues = reports.length;
  const pendingIssues = reports.filter((r) => r.status === "pending").length;
  const inProgressIssues = reports.filter(
    (r) => r.status === "in-progress"
  ).length;
  const resolvedIssues = reports.filter((r) => r.status === "resolved").length;
  // const totalPayments = reports.reduce(
  //   (sum, r) => sum + (r.paymentAmount || 0),
  //   0
  // );

  // // ✅ High Priority Payments (1000 per High priority report created by this citizen)
  // const highPriorityPayments = reports
  //   .filter((r) => r.priority === "High" && r.reporter?.email === user?.email)
  //   .reduce((sum) => sum + 100, 0);

  // Chart data
  const chartData = [
    { name: "Pending", value: pendingIssues },
    { name: "In Progress", value: inProgressIssues },
    { name: "Resolved", value: resolvedIssues },
  ];

  return (
    <Container>
      <h1 className="text-center text-3xl font-bold lg:mt-10">
        Citizen Dashboard
      </h1>
      <div className="mt-10 px-4 md:px-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-12">
              <StatCard
                icon={<MdReportProblem className="w-7 h-7 text-white" />}
                title="Total Issues"
                value={totalIssues}
                gradient="bg-gradient-to-r from-red-600 to-red-400"
              />
              <StatCard
                icon={<AiOutlineClockCircle className="w-7 h-7 text-white" />}
                title="Pending Issues"
                value={pendingIssues}
                gradient="bg-gradient-to-r from-yellow-600 to-yellow-400"
              />
              <StatCard
                icon={<AiOutlineClockCircle className="w-7 h-7 text-white" />}
                title="In Progress Issues"
                value={inProgressIssues}
                gradient="bg-gradient-to-r from-blue-600 to-blue-400"
              />
              <StatCard
                icon={<AiOutlineCheckCircle className="w-7 h-7 text-white" />}
                title="Resolved Issues"
                value={resolvedIssues}
                gradient="bg-gradient-to-r from-teal-600 to-teal-400"
              />

              {/* <StatCard
                icon={<FaDollarSign className="w-7 h-7 text-white" />}
                title="Total Payments"
                value={`$${totalPayments}`}
                gradient="bg-gradient-to-r from-purple-600 to-purple-400"
              /> */}
            </div>

            {/* Chart */}
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

export default CitizenStatistics;
