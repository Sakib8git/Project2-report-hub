import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Container from "../Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const IssuesCard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 8;

  // ✅ Search & Filter state
  const [searchInput, setSearchInput] = useState(""); 
  const [search, setSearch] = useState("");           
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Debounce logic for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 1000); // 500ms delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const { data: citizens = [] } = useQuery({
    queryKey: ["citizens"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/citizen`
      );
      return res.data;
    },
  });

  const currentCitizen = citizens.find((c) => c.email === user?.email);
  const isBlocked = currentCitizen?.action === "block";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["issues", page, search, status, priority, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports-paginated?page=${page}&limit=${limit}&search=${search}&status=${status}&priority=${priority}&category=${category}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const issues = data?.issues || [];
  const totalPages = data?.totalPages || 1;

  //  High priority issues 
  const sortedIssues = [...issues].sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (a.priority !== "High" && b.priority === "High") return 1;
    return 0;
  });

  const handleUpvote = async (id) => {
    if (isBlocked) {
      toast.error("🚫 You are blocked");
      navigate("/");
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/reports/${id}/upvote`
      );

      if (res.data.result?.modifiedCount > 0) {
        toast.success("Upvoted successfully!");
        refetch();
      } else {
        toast.error(res.data.message || "Already upvoted");
      }
    } catch (err) {
      toast.error("Failed to upvote");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Issues: {issues.length} </h1>

      {/* ✅ Search + Filter UI */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Category</option>
          <option value="Road">Road</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Water">Water</option>
          <option value="Garbage">Garbage</option>
        </select>
      </div>

      {sortedIssues && sortedIssues.length > 0 ? (
        <>
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedIssues.map((issue) => (
              <div
                key={issue._id}
                className="rounded-lg shadow-md overflow-hidden bg-white"
              >
                {/* Image */}
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{issue.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Category: {issue.category}
                  </p>
                  <p className="text-sm mb-1">
                    Status:{" "}
                    <span className="font-bold text-blue-600">
                      {issue.status}
                    </span>
                  </p>
                  <p className="text-sm mb-1">
                    Priority:{" "}
                    <span
                      className={
                        issue.priority === "High"
                          ? "text-red-600 font-bold"
                          : "text-green-600 font-bold"
                      }
                    >
                      {issue.priority}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Location: {issue.location}
                  </p>

                  {/* Description */}
                  {issue.description && (
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {issue.description}
                    </p>
                  )}

                  {/* Reporter Info */}
                  {issue.reporter && (
                    <p className="text-xs text-gray-500">
                      Reported by: {issue.reporter.name} ({issue.reporter.email})
                    </p>
                  )}

                  {/* Footer: Upvote + View Details */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleUpvote(issue._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      👍🏻Upvote ({issue.upvote || 0})
                    </button>
                    <Link
                      to={`/issue-details/${issue._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No issues found</p>
      )}
    </Container>
  );
};

export default IssuesCard;