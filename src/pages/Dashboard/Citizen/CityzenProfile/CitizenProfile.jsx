import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import coverImg from "../../../../assets/images/cover.jpg";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SubscribeModal from "../../../../components/Modal/SubscribeModal";

const CitizenProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ useQuery for fetching profile
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["citizenProfile", user?.email],
    enabled: !!user?.email, // only run if email exists
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/citizen/${user.email}`);
      return data;
    },
    onError: () => {
      toast.error("Failed to load profile");
    },
  });

  const isPremium = profile?.status === "premium";
  const isBlocked = profile?.action === "block";

  // ✅ modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading profile</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <img src={coverImg} alt="cover" className="w-full h-48 object-cover" />

        <div className="flex flex-col md:flex-row items-center md:items-start px-6 py-8 gap-6">
          <div className="flex-shrink-0">
            <img
              src={profile?.image || user?.photoURL}
              alt="profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.name || user?.displayName}
              </h2>
              {isPremium && (
                <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full">
                  Premium
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>User ID:</strong> {user?.uid}
            </p>

            {isBlocked && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mt-4">
                <p className="font-semibold">
                  ⚠ Your account has been blocked by the admin.
                </p>
                <p>Please contact the authorities for assistance.</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard/update-profile"
                className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700"
              >
                Update Profile
              </Link>
              {!isPremium && !isBlocked && (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-700"
                  >
                    Subscribe (1000tk)
                  </button>

                  <SubscribeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    profile={profile}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;
