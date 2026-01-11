import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TestimonialsSection = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch comments from backend
  const { data: comments = [], isLoading, isError } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comments");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading comments...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load comments</p>;

  return (
    <div className=" py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl custom-heading -mt-10">
          What Citizens Say
        </h2>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
          {comments.map((c) => (
            <div
              key={c._id}
              className="p-6  rounded-lg bg-base-200 hover:bg-base-100 shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <img
                src={c.avatar || "https://via.placeholder.com/80?text=U"}
                alt={c.name}
                className="w-20 h-20 rounded-full mb-4 border-2 border-green-500"
              />
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="mt-2  text-sm italic">
                "{c.comment}"
              </p>
              <p className="mt-3 text-xs ">
                {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB") : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;