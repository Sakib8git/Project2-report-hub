import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";

const ResolveCard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports`
      );
      // ✅ make sure we return an array
      return Array.isArray(result.data)
        ? result.data
        : result.data.reports || [];
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load reports</p>;

  // ✅ Safe filter
  const resolvedReports = Array.isArray(reports)
    ? reports
        .filter((r) => r.status === "resolved")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
    : [];

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-12">
        {resolvedReports.map((resolve, index) => {
          let positionClass = "";
          if (resolvedReports.length === 6) {
            if (index === 4) positionClass = "md:col-start-2";
            if (index === 5) positionClass = "md:col-start-3";
          }

          return (
            <div
              key={resolve._id}
              className={`rounded-lg shadow-md overflow-hidden bg-white ${positionClass}`}
            >
              <img
                src={resolve.image}
                alt={resolve.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{resolve.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Category: {resolve.category}
                </p>
                <p className="text-sm mb-1">
                  Status:{" "}
                  <span className="font-bold text-blue-600">
                    {resolve.status}
                  </span>
                </p>
                <p className="text-sm mb-1">
                  Priority:{" "}
                  <span
                    className={
                      resolve.priority === "High"
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {resolve.priority}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Location: {resolve.location}
                </p>
                {resolve.description && (
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    {resolve.description}
                  </p>
                )}
                {resolve.reporter && (
                  <p className="text-xs text-gray-500">
                    Reported by: {resolve.reporter?.name} (
                    {resolve.reporter?.email})
                  </p>
                )}
                <div className="flex justify-end items-center mt-4">
                  <Link
                    to={`/issue-details/${resolve._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ResolveCard;
