import React, { useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";

const MyIssues = () => {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  // citizen--------------
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

  // ✅ Fetch issues from backend
  const {
    data: issues = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/dashboard/my-issues`
      );
      console.log(res.data);
      return res.data;
    },
  });
  // edit
  const handleUpdate = async (e) => {
    if (isBlocked) {
      toast.error("🚫 You are blocked");
      navigate("/");
      return;
    }
    e.preventDefault();
    const form = e.target;
    const updatedIssue = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
    };

    try {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/reports/${selectedIssue._id}`,
        updatedIssue
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Issue updated successfully!");
        setShowModal(false);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to update issue");
    }
  };
  // delete
  const handleDelete = async (id) => {
    if (isBlocked) {
      toast.error("🚫 You are blocked");
      navigate("/");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/reports/${id}`
          );

          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your issue has been deleted.", "success");
            toast.success("Issue deleted successfully!");
            refetch();
            navigate("/dashboard/my-issues"); // redirect or refetch
          } else {
            Swal.fire(
              "Not Authorized",
              "You cannot delete this issue.",
              "error"
            );
            toast.error("You are not authorized to delete this issue!");
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete issue.", "error");
          toast.error("Failed to delete issue");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  // ✅ Filtered issues
  const filteredIssues = issues.filter(
    (issue) =>
      (filterStatus ? issue.status === filterStatus : true) &&
      (filterCategory ? issue.category === filterCategory : true)
  );

  const handleEdit = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Issues</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Filter by Category</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
        </select>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue._id} // ✅ use MongoDB _id
            className="border rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{issue.title}</h2>
              <p className="text-sm text-gray-600">
                Category: {issue.category} | Status:{" "}
                <span
                  className={`font-bold ${
                    issue.status === "Pending"
                      ? "text-yellow-600"
                      : issue.status === "In-Progress"
                      ? "text-blue-600"
                      : issue.status === "Resolved"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {issue.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Location: {issue.location}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {issue.status === "Pending" && (
                <button
                  onClick={() => handleEdit(issue)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(issue._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
              <Link
                to={`/issue-details/${issue._id}`} // ✅ navigate by _id
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
              >
                <FaEye /> View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal (UI only) */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={selectedIssue.title}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="description"
                defaultValue={selectedIssue.description}
                className="w-full border rounded px-3 py-2"
              />
              <select
                name="category"
                defaultValue={selectedIssue.category}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Streetlight">Streetlight</option>
                <option value="Road">Road</option>
                <option value="Garbage">Garbage</option>
                <option value="Garbage">Water</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
