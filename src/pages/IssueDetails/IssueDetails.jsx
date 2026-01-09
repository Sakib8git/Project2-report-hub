import React, { useState } from "react";
import { useNavigate, useParams } from "react-router"; // jemon tumi chaicho
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaBolt } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const IssueDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {
    data: issue,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports/${id}`
      );
      return res.data;
    },
  });

  //!note: edit----------------------------------------------

  // ✅ useForm setup
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
      category: issue?.category || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/reports/${id}`,
        data
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

  //!note: delete----------------------------------------------
  const handleDelete = async () => {
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
            Swal.fire({
              title: "Deleted!",
              text: "Your issue has been deleted.",
              icon: "success",
            });
            toast.success("Issue deleted successfully!");
            navigate("/"); // ✅ redirect after delete
          } else {
            Swal.fire({
              title: "Not Authorized",
              text: "You cannot delete this issue.",
              icon: "error",
            });
            toast.error("You are not authorized to delete this issue!");
          }
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete issue.",
            icon: "error",
          });
          toast.error("Failed to delete issue");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issue</p>;

  // const canEdit =
  //   issue.reporter?.email === user?.email && issue.status === "Pending";
  // const canDelete = issue.reporter?.email === user?.email;
  // const canBoost =issue.reporter?.email === user?.email && !issue.boosted;
  // permissions
  const canEdit =
    !isBlocked &&
    issue.reporter?.email === user?.email &&
    issue.status === "Pending";

  const canDelete =
    !isBlocked &&
    issue.reporter?.email === user?.email &&
    issue.status === "Pending";

  const canBoost =
    !isBlocked &&
    issue.reporter?.email === user?.email &&
    issue.status === "Pending" &&
    !issue.boosted;

  // boost
  const handleBoost = async () => {
    try {
      // Boost payment info backend এ পাঠানো হবে
      const paymentInfo = {
        issueId: issue._id,
        email: user?.email,
        charge: 100,
        title: issue.title,
        image: issue.image,
      };
      console.log(paymentInfo);
      // Backend এ call
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/create-boost-session`,
        paymentInfo
      );

      // Stripe checkout এ redirect
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to get Stripe session URL");
      }
    } catch (err) {
      console.error("Boost error:", err);
      toast.error("Failed to initiate boost payment");
    }
  };

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        {/* Issue Header */}
        <h1 className="text-3xl font-bold mb-6">{issue.title}</h1>

        {/* Flex Layout: Image Left + Info Right */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-[336px] object-cover rounded-lg shadow"
            />
          </div>

          {/* Info */}
          <div className="md:w-1/2 bg-white shadow rounded-lg p-6 flex flex-col justify-between">
            <div>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {issue.category}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    issue.status === "Pending"
                      ? "bg-yellow-500"
                      : issue.status === "In-Progress"
                      ? "bg-blue-500"
                      : issue.status === "Resolved"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {issue.status}
                </span>
              </p>
              <p>
                <span className="font-semibold ">Priority:</span>{" "}
                <span className="text-green-600 font-semibold">
                  {" "}
                  {issue.priority}
                </span>
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {issue.location}
              </p>
              <p>
                <span className="font-semibold">Upvote:</span> {issue.upvote}
              </p>

              <p>
                <span className="font-semibold">Description:</span>{" "}
                {issue.description}
              </p>
              {issue.createdAt && (
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              <div className="flex gap-4 mb-4">
                {canEdit && (
                  <button
                    onClick={() => {
                      reset({
                        title: issue.title,
                        description: issue.description,
                        category: issue.category,
                      });
                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash /> Delete
                  </button>
                )}
              </div>
              {/* {canBoost && (
                <button
                  onClick={handleBoost} // ✅ handler added
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  <FaBolt /> Boost Priority (100৳)
                </button>
              )} */}
              {isBlocked ? (
                <p className="text-red-600 font-semibold mt-2">
                  🚫 You are blocked. Actions are disabled.
                </p>
              ) : (
                canBoost && (
                  <button
                    onClick={handleBoost}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    <FaBolt /> Boost Priority (100৳)
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  {...register("title")}
                  className="w-full border rounded px-3 py-2"
                />
                <textarea
                  {...register("description")}
                  className="w-full border rounded px-3 py-2"
                />
                <select
                  {...register("category")}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Streetlight">Streetlight</option>
                  <option value="Road">Road</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Water">Water</option>
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

        {/* Staff Info */}
        <div className="bg-white shadow rounded-lg p-6 mt-10">
          <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
            Issue Progress Timeline
          </h2>
        </div>
        {/* --------------------------- */}
        <div className="relative border-l border-gray-300 ml-4">
          {/* Step 1: Reported By */}
          {issue.reporter && (
            <div className="mb-10 ml-6">
              <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5 border border-white"></div>
              <h3 className="text-lg font-semibold">Reported By</h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Name:</span>{" "}
                {issue.reporter.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Email:</span>{" "}
                {issue.reporter.email}
              </p>
              {issue.lastUpdated && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {new Date(issue.lastUpdated).toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Assigned Staff */}
          {issue?.assignedStaff ? (
            <div className="mb-10 ml-6 relative">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-7.5 border border-white"></div>
              <h3 className="text-lg font-semibold">Assigned Staff</h3>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Name:</span>{" "}
                {issue.assignedStaff?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Role:</span>{" "}
                {issue.staffInfo?.role || "Staff"}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Issue Status:</span>{" "}
                {issue.status || "N/A"}
              </p>

              {/* Optional: show assigned date */}
              {issue.statusUpdatedAt && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Assigned On:</span>{" "}
                  {new Date(issue.statusUpdatedAt).toLocaleString()}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Assigned by:{" "}
                <span className="font-semibold text-blue-600">
                  {issue.assignedBy || "Admin Panel"}
                </span>
              </p>
            </div>
          ) : null}
          {/* ---------------------- */}

          {/* ---------------------- */}
          {/* Step 3: Resolved (Optional future step) */}
          {issue.status === "resolved" && (
            <div className="mb-10 ml-6">
              <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-1.5 border border-white"></div>
              <h3 className="text-lg font-semibold">Issue Closed</h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Resolved By:</span>{" "}
                {issue.assignedStaff?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Status:</span> {issue.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold ">Closed By:<span className="text-blue-600">Admin Panel</span> </span>{" "}
                {issue.staffInfo}
              </p>
              
              {issue.resolvedAt && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Resolved On:</span>{" "}
                  {new Date(issue.resolvedAt).toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </p>
              )}
            </div>
          )}

          {/* ------------------------- */}
        </div>
      </div>
    </Container>
  );
};

export default IssueDetails;
