import React from "react";
// import coverImg from "../../assets/images/cover.jpg"; // optional background

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About Our System
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A modern citizen issue management platform built for speed, clarity,
            and trust. Designed to connect citizens, staff, and administrators
            in one seamless workflow.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-3">🚀 Fast & Scalable</h2>
            <p className="text-gray-400 text-sm">
              Built with React, Tailwind, and MERN stack to ensure lightning-fast
              performance and scalability.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-3">🔒 Secure</h2>
            <p className="text-gray-400 text-sm">
              Authentication, role-based access, and encrypted payments keep
              everything safe and reliable.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-3">🌍 Citizen-Centric</h2>
            <p className="text-gray-400 text-sm">
              Focused on transparency and accountability, empowering citizens to
              report and track issues easily.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16">
          <p className="text-gray-400 text-sm">
            Crafted with ❤️ by Nazmus Sakib — Frontend & MERN Stack Developer
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;