import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaShieldAlt, FaChartLine } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-base-200 to-base-300 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold mb-6"
          >
            Welcome to ReportHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-base-content/70 max-w-3xl mx-auto"
          >
            ReportHub is a cutting-edge platform designed to empower citizens,
            streamline issue reporting, and foster collaboration between
            communities and authorities. Together, we build a better tomorrow.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community Driven",
                desc: "Empowering citizens to take charge of their communities with seamless issue reporting.",
                icon: <FaUsers className="text-5xl text-primary" />,
              },
              {
                title: "Secure & Reliable",
                desc: "Built with robust security measures to ensure data privacy and trust.",
                icon: <FaShieldAlt className="text-5xl text-success" />,
              },
              {
                title: "Data-Driven Insights",
                desc: "Providing actionable insights to authorities for better decision-making.",
                icon: <FaChartLine className="text-5xl text-warning" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-base-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-base-content/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image and Text Section */}
      <section className="py-16 px-6 bg-base-300">
  <div className="max-w-7xl mx-auto">
    {[
      {
        img: "https://i.ibb.co/LhXt8K0y/5889.jpg",
        title: "Empowering Communities",
        desc: "From urban neighborhoods to local councils, ReportHub gives citizens a voice. By simplifying issue reporting, we ensure that everyday concerns—like broken roads, streetlights, or sanitation—reach the right authorities and get resolved efficiently.",
      },
      {
        img: "https://i.ibb.co/0p21mwRP/no-plastic.jpg",
        title: "Driving Awareness",
        desc: "ReportHub supports grassroots movements and environmental campaigns. Whether it's raising awareness about plastic pollution or organizing community cleanups, our platform amplifies local efforts for a sustainable future.",
      },
      {
        img: "https://i.ibb.co/NdXSzsJ5/pollution-concept-water-with-garbage.jpg",
        title: "Creating Impact",
        desc: "Every report matters. From tracking pollution hotspots to mobilizing cleanup teams, ReportHub transforms citizen data into actionable insights—leading to cleaner rivers, safer streets, and healthier communities.",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${
          index % 2 === 0 ? "md:flex-row-reverse" : ""
        }`}
      >
        <img
          src={item.img}
          alt={item.title}
          className="rounded-lg shadow-lg w-full md:w-1/2 hover:scale-105 transition"
        />
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
          <p className="text-base-content/70">{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      
    </div>
  );
};

export default About;