import React from "react";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../../../components/Shared/Button/Button";
import Container from "../../../../components/Shared/Container";
import FileUpload from "../../../../components/Form/FileUpload/FileUpload";
import useAuth from "../../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageUplode } from "../../../../utils";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";

const ReportIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ✅ Citizen data fetch
  const { data: citizenData } = useQuery({
    queryKey: ["citizen", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/citizen?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

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

  // Limit check
  const isLimitReached =
    citizenData?.role === "citizen" &&
    citizenData?.status === "normal" &&
    citizenData?.issuesCount >= 3;

  if (isLimitReached) {
    // toast.error("Buy subscription");
    // navigate("/dashboard/cityzen-profile", { replace: true });
    return null;
  }

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/reports`,
        payload
      );
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Issue reported successfully!");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to submit issue!");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, image, category, location } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUplode(imageFile);

      const reportData = {
        image: imageUrl,
        title,
        description,
        location,
        category,
        status: "Pending",
        priority: "Normal",
        upvote: 0,
        createdAt: new Date().toISOString(),
        reporter: {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
        },
      };

      await mutateAsync(reportData);

      reset();
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!");
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) {
    toast.error("Buy subscription.........");
    return <Navigate to="/dashboard/cityzen-profile" replace />;
  }

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Report New Issue</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              {...register("name")}
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              {...register("email")}
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded px-3 py-2"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="Streetlight">Streetlight</option>
              <option value="Road">Road</option>
              <option value="Garbage">Garbage</option>
              <option value="Water">Water</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <select
              {...register("location", { required: "Location is required" })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Barishal">Barishal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <FileUpload label="Upload Image" register={register("image")} />
          </div>

          {/* Submit */}
          {/* <div className="flex justify-end">
            <Button type="submit" label="Submit Issue" />
          </div> */}
          {/* Submit */}
          <div className="flex justify-end">
            {isBlocked ? (
              <p className="text-red-600 font-semibold">🚫 You are blocked</p>
            ) : (
              <Button type="submit" label="Submit Issue" />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ReportIssue;
