"use client";

import React, { useEffect } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const AnimatedNumber = ({ target }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, target, { duration: 2 });
    return () => controls.stop();
  }, [target, count]);

  return (
    <motion.span className="text-3xl font-extrabold text-black">
      {rounded}
    </motion.span>
  );
};

const StatisticsSection = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch reports, citizens, staff
  const { data: reports = [], isLoading: loadingReports } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports`
      );
      return res.data;
    },
  });

  const { data: citizens = [], isLoading: loadingCitizens } = useQuery({
    queryKey: ["citizens"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/citizen`
      );
      return res.data;
    },
  });

  const { data: staff = [], isLoading: loadingStaff } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/staff`
      );
      return res.data;
    },
  });

  if (loadingReports || loadingCitizens || loadingStaff) {
    return <p className="text-center py-10">Loading statistics...</p>;
  }

  const stats = [
    {
      id: 1,
      icon: <FaClipboardList className="text-green-600 text-4xl" />,
      value: reports.length,
      label: "Total Issues Reported",
    },
    {
      id: 2,
      icon: <FaCheckCircle className="text-green-600 text-4xl" />,
      value: reports.filter((r) => r.status === "resolved").length,
      label: "Issues Resolved",
    },
    {
      id: 3,
      icon: <FaUsers className="text-green-600 text-4xl" />,
      value: citizens.length,
      label: "Active Citizens",
    },
    {
      id: 4,
      icon: <FaUserShield className="text-green-600 text-4xl" />,
      value: staff.length,
      label: "Staff Members",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              {stat.icon}
              <div className="mt-4">
                <AnimatedNumber target={stat.value} />
              </div>
              <p className="mt-2 text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
