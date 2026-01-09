import React from "react";
import { useNavigate, useParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

import { toast } from "react-hot-toast"; // ✅ notification
import useAxiosSecure from "../../hooks/useAxiosSecure";

const HighSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ issueId URL থেকে ধরার জন্য
  const asiossecure = useAxiosSecure();

  // ✅ Handler: priority High করে navigate করবে
  const handleGoBack = async () => {
    try {
      const res = await asiossecure.patch(
        `${import.meta.env.VITE_API_URL}/reports/priority/${id}`
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Priority boosted to High!");
        navigate(`/issue-details/${id}`);
      } else {
        toast.error("Failed to boost priority");
      }
    } catch (err) {
      toast.error("Error updating priority");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      {/* Success Icon */}
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />

      {/* Success Message */}
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Your issue has been boosted successfully. Priority is now set to{" "}
        <span className="font-semibold text-green-600">High</span>.
      </p>

      {/* Back to Issue Details Button */}
      <button
        onClick={handleGoBack}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Go Back to Issue Details
      </button>
    </div>
  );
};

export default HighSuccess;
