import React from "react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";

const statusFlow = {
  pending: "in-progress",
  "in-progress": "working",
  working: "resolved",
};
const statusOptions = ["in-progress", "working", "resolved"];

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ✅ Fetch issues assigned to this staff
  const {
    data: issues = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["assigned-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports/assigned/${user.email}`
      );
      return res.data;
    },
  });

  // ✅ Mutation for status update
  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/reports/${id}/status`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Status updated!");
      if (variables.newStatus === "resolved") {
        refetch();
      } else {
        queryClient.invalidateQueries(["assigned-issues", user?.email]);
      }
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Assigned Issues</h1>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue._id}
                className={issue.boosted ? "bg-yellow-50 font-semibold" : ""}
              >
                <td className="p-2 whitespace-nowrap">{issue._id}</td>
                <td className="p-2 whitespace-nowrap">{issue.title}</td>
                <td className="p-2 capitalize whitespace-nowrap">
                  {issue.status}
                </td>
                <td className="p-2 capitalize whitespace-nowrap">
                  {issue.priority}
                </td>
                <td className="p-2">
                  <select
                    value={issue.status}
                    onChange={(e) =>
                      statusMutation.mutate({
                        id: issue._id,
                        newStatus: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    <option value={issue.status}>{issue.status}</option>
                    {statusOptions
                      .filter((s) => statusFlow[issue.status] === s)
                      .map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssues;