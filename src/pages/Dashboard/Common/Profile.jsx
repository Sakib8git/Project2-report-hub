import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";
import ProfileModal from "../../../components/Modal/ProfileModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // ✅ Fetch profile with useQuery
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user.email}`);
      console.log(data.role);
      return data;
    },
  });

  // ✅ Update profile with useMutation
  const { mutate: updateProfile } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/user/${user.email}`, data);
      console.log(res.data);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        setShowUpdateModal(false);
        // ✅ refresh cached profile
        queryClient.invalidateQueries(["userProfile", user.email]);
      } else {
        toast.error("No changes detected.");
      }
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <img
            alt="profile"
            src={profile?.image || user?.photoURL}
            className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
          />

          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
            {profile?.role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-gray-600">
                  {profile?.name || user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-gray-600">{user?.email}</span>
              </p>

              <div>
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="bg-lime-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <ProfileModal
        isOpen={showUpdateModal}
        close={() => setShowUpdateModal(false)}
        initialData={{
          displayName: profile?.name || user?.displayName,
          photoURL: profile?.image || user?.photoURL,
        }}
        onConfirm={(data) => updateProfile(data)}
      />
    </div>
  );
};

export default Profile;
