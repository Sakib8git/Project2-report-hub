import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // ✅ Fetch users from backend (citizen collection)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/citizen`
        );
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleBlockToggle = (userId, currentAction) => {
    const newAction = currentAction === "block" ? "unblock" : "block";

    Swal.fire({
      title: `Are you sure you want to ${newAction} this user?`,
      text: "This action can be reverted later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newAction} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/citizen/action/${userId}`, { action: newAction })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              const updated = users.map((user) =>
                user._id === userId ? { ...user, action: newAction } : user
              );
              setUsers(updated);

              Swal.fire({
                title: "Success!",
                text: `User has been ${newAction}ed.`,
                icon: "success",
              });

              toast.success(`User ${userId} ${newAction}ed`);
              console.log(`DB updated: ${userId} ${newAction}ed`);
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update user in DB");
          });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Manage Citizen</h1>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-sm md:text-base">
              {/* ID column hidden on small screens */}
              <th className="p-2 hidden sm:table-cell">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "citizen")
              .map((user) => (
                <tr
                  key={user._id}
                  className={`text-sm md:text-base ${
                    user.status === "blocked" ? "bg-red-50" : ""
                  }`}
                >
                  {/* ID column hidden on small screens */}
                  <td className="p-2 hidden sm:table-cell">{user._id}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                  <td className="p-2 capitalize flex items-center gap-2">
                    {user.status === "premium" ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-white rounded-full">
                        Premium
                      </span>
                    ) : (
                      user.status || "active"
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        handleBlockToggle(user._id, user.action || "unblock")
                      }
                      className={`px-3 py-1 rounded text-white text-xs md:text-sm ${
                        user.action === "block"
                          ? "bg-green-500 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-700"
                      }`}
                    >
                      {user.action === "block" ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;