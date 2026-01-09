import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import coverImg from "../../../../assets/images/cover.jpg";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ProfileModal from "../../../../components/Modal/ProfileModal";

const StaffProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // ✅ Fetch staff profile
  const {
    data: staffProfile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["staffProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/staff/${user.email}`);
      return data;
    },
  });

  // ✅ Update staff profile (email based route)
  const { mutate: updateStaff } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/staff/self/${user.email}`, data); // ✅ email based route
      return res.data;
    },
    onSuccess: (res) => {
      if (res.modifiedCount > 0) {
        toast.success("Staff profile updated!");
        setShowUpdateModal(false);
        refetch(); // ✅ force refresh
      } else {
        toast.error("No changes detected.");
      }
    },
    onError: () => {
      toast.error("Failed to update staff profile.");
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !staffProfile)
    return <p className="text-center text-red-500">Staff profile not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Cover Image */}
        <img src={coverImg} alt="cover" className="w-full h-48 object-cover" />

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start px-6 py-8 gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={staffProfile?.photo || user?.photoURL || "/default.png"} // ✅ use "photo" field
              alt="profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {staffProfile?.name || user?.displayName || "Unknown Staff"}
            </h2>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {staffProfile?.email || user?.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Phone:</strong> {staffProfile?.phone || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Role:</strong> {staffProfile?.role || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>User ID:</strong> {user?.uid}
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <ProfileModal
        isOpen={showUpdateModal}
        close={() => setShowUpdateModal(false)}
        initialData={{
          displayName: staffProfile?.name || user?.displayName,
          photoURL: staffProfile?.photo || user?.photoURL, // ✅ use "photo"
        }}
        onConfirm={(data) => updateStaff(data)}
      />
    </div>
  );
};

export default StaffProfile;