import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router"; // ✅ react-router-dom ব্যবহার করো
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BoostPaySuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Optional: scroll to top
  useEffect(() => window.scrollTo(0, 0), []);

  // ✅ React Query দিয়ে citizen profile ফেচ করা
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["citizenProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/citizen/${user.email}`);
      return data;
    },
    onError: () => {
      toast.error("Failed to load profile");
    },
  });

  // const handleActivatePremium = async () => {
  //   try {
  //     if (!profile?._id) {
  //       toast.error("Citizen ID not found");
  //       return;
  //     }

  //     // 1️Citizen status update
  //     await axiosSecure.patch(`/citizen/status/${profile._id}`, {
  //       status: "premium",
  //       name: profile?.name || user?.displayName,
  //       sessionId,
  //       amount: 1000,
  //     });

  //     // 2️Payment log insert (payments collection এ save হবে)
  //     await axiosSecure.post("/payments", {
  //       citizenId: profile._id,
  //       name: profile?.name || user?.displayName,
  //       sessionId,
  //       amount: 1000,
  //       status: "success",
  //       date: new Date(),
  //     });

  //     toast.success("Premium activated successfully!");
  //     navigate("/dashboard/cityzen-profile");
  //   } catch (err) {
  //     console.error("Activation error:", err.response?.data || err.message);
  //     toast.error("Failed to activate premium");
  //   }
  // };

  const handleActivatePremium = async () => {
    try {
      //   console.log(profile._id);
      if (!profile?._id) {
        toast.error("Citizen ID not found");
        return;
      }

      await axiosSecure.patch(`/citizen/status/${profile._id}`, {
        status: "premium",
      });

      toast.success("Premium activated successfully!");
      navigate("/dashboard/cityzen-profile");
    } catch (err) {
      console.error("Activation error:", err.response?.data || err.message);
      toast.error("Failed to activate premium");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading profile</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header card */}
        <div className="rounded-2xl shadow-lg bg-white overflow-hidden">
          <div className="bg-emerald-600 text-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                {/* Check icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7 12a5 5 0 1010 0 5 5 0 00-10 0z"
                  />
                </svg>
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Payment successful
                </h1>
                <p className="text-emerald-100">
                  Your payment has been processed.
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {/* Receipt summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Status</p>
                <p className="mt-1 font-semibold text-emerald-700">
                  Normal → Premium (pending activation)
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="mt-1 font-semibold text-gray-800">৳ 1000</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Checkout session</p>
                <p className="mt-1 font-mono text-xs text-gray-700 break-all">
                  {sessionId || "N/A"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Next billing</p>
                <p className="mt-1 text-gray-800">Manual (one-time)</p>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4">
              <p className="text-sm text-emerald-900">
                Click below to activate Premium. Your status may take a moment
                to reflect across the app.
              </p>
            </div>

            {/* Single Action */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleActivatePremium}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700"
              >
                Activate Premium
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5-5 5M6 7h7v10H6z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-sm text-gray-500">
          If you need help, contact support or try re-opening your profile page.
        </p>
      </div>
    </div>
  );
};

export default BoostPaySuccess;
