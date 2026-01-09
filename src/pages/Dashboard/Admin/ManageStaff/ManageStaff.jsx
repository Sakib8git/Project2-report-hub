import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import StaffModal from "../../../../components/Modal/StaffModal";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Container from "../../../../components/Shared/Container";

const ManageStaff = () => {
  const auth = getAuth();
  const axiosSecure = useAxiosSecure();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
    role: "staff",
  });

  const {
    data: staffList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/staff`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading staff...</p>;

  //Add Staff
  const handleAddStaff = async () => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const staffData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo,
        password: formData.password,
        role: "staff",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/staff`,
        staffData
      );

      if (res.data.insertedId) {
        toast.success("Staff added successfully!");
        refetch();
        setShowAddModal(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          photo: "",
          password: "",
          role: "staff",
        });
      }
    } catch (err) {
      console.error("Add staff error:", err);
      toast.error(err?.message || "Failed to add staff");
    }
  };

  // Add Staff
  // const handleAddStaff = async () => {
  //   try {
  //     if (
  //       !formData.name ||
  //       !formData.email ||
  //       !formData.phone ||
  //       !formData.password
  //     ) {
  //       toast.error("Please fill all required fields");
  //       return;
  //     }

  //     // ✅ শুধু backend এ পাঠাও
  //     const staffData = {
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone,
  //       photo: formData.photo,
  //       password: formData.password, // backend এ Admin SDK দিয়ে user তৈরি হবে
  //       role: "staff",
  //     };

  //     const res = await axiosSecure.post(
  //       `${import.meta.env.VITE_API_URL}/staff`,
  //       staffData
  //     );

  //     if (res.data.insertedId || res.data.acknowledged) {
  //       toast.success("Staff added successfully!");
  //       refetch();
  //       setShowAddModal(false);
  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         photo: "",
  //         password: "",
  //         role: "staff",
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Add staff error:", err);
  //     toast.error(err?.message || "Failed to add staff");
  //   }
  // };

  // Update Staff
  const handleUpdateStaff = async () => {
    try {
      if (!formData._id) {
        toast.error("Invalid staff record");
        return;
      }
      const updatePayload = {
        name: formData.name,
        phone: formData.phone,
      };
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/staff/${formData._id}`,
        updatePayload
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Staff updated successfully!");
        refetch();
        setShowUpdateModal(false);
      }
    } catch (err) {
      toast.error("Failed to update staff");
    }
  };

  // Delete Staff
  const handleDeleteStaff = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This staff will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/staff/${id}`
          );

          if (res?.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Staff has been removed.", "success");
            refetch();
          } else {
            toast.error("No staff found to delete");
          }
        } catch (err) {
          console.error("Delete staff error:", err);
          toast.error("Failed to delete staff");
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">
        Manage Staff
      </h1>

      {/* Add Staff Button */}
      <button
        onClick={() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            photo: "",
            password: "",
            role: "staff",
          });
          setShowAddModal(true);
        }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2 rounded-lg text-white font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition mb-6"
      >
        + Add Staff
      </button>

      {/* Staff Table */}
      <Container>
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, idx) => (
                <tr
                  key={staff._id}
                  className={`border-b hover:bg-gray-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    {staff.photo ? (
                      <img
                        src={staff.photo}
                        alt={staff.name}
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                        No Photo
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {staff.name}
                  </td>
                  <td className="p-3 text-gray-600">{staff.email}</td>
                  <td className="p-3 text-gray-600">{staff.phone}</td>
                  <td className="p-3 capitalize text-indigo-600 font-semibold">
                    {staff.role}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setFormData(staff);
                        setShowUpdateModal(true);
                      }}
                      className="bg-green-500 px-3 py-1 rounded-md text-white hover:bg-green-600 transition shadow-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(staff._id)}
                      className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 transition shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {/* Modals */}
      <StaffModal
        isOpen={showAddModal}
        close={() => setShowAddModal(false)}
        title="Add Staff"
        fields={["name", "email", "phone", "photo", "password", "role"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleAddStaff}
      />

      <StaffModal
        isOpen={showUpdateModal}
        close={() => setShowUpdateModal(false)}
        title="Update Staff"
        fields={["name", "phone"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleUpdateStaff}
      />
    </div>
  );
};

export default ManageStaff;
