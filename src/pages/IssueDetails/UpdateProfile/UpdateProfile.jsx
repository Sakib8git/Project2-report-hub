import React, { useState } from "react";

import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUplode } from "../../../utils";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [imageFile, setImageFile] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageURL = user?.photoURL;

      if (imageFile) {
        imageURL = await imageUplode(imageFile);
      }

      const updatedData = {
        name,
        image: imageURL,
      };

      // ✅ email diye patch call
      const res = await axiosSecure.patch(
        `/citizen/${user.email}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully!");

        // ✅ re-fetch updated citizen data from backend
        const { data } = await axiosSecure.get(`/citizen/${user.email}`);

        // save to local state/context (ekhane ekta state thakbe)
        setProfile(data);

        // navigate back to profile page
        navigate("/dashboard/cityzen-profile");
      } else {
        toast.error("No changes detected.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
