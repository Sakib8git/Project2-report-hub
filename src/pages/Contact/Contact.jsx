import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Container from "../../components/Shared/Container";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields before submitting!",
      });
      return;
    }

    // Show success alert
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: `Thank you, ${formData.name}. We have received your message and will get back to you soon.`,
    });

    // Reset form fields
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Container>
      <div className="min-h-screen flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12 px-4 md:px-8 py-10">
        {/* Left Section: Image */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center items-center order-last md:order-first"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.ibb.co.com/ycNLTNyq/markus-winkler-q3-QPw37-J6-Xs-unsplash.jpg"
            alt="Contact Us"
            className="rounded-lg shadow-lg h-[400px] md:h-[560px] w-[900px] object-cover"
          />
          {/* ✅ Added text under image */}
          <p className="mt-4 text-sm md:text-base text-center text-base-content/70 max-w-md">
            Whether it's feedback, questions, or collaboration—your voice
            matters. Reach out and let's connect.
          </p>
        </motion.div>

        {/* Right Section: Contact Form */}
        <motion.div
          className="w-full md:w-1/2 p-6 md:p-8 rounded-lg shadow-lg order-first md:order-last"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Get in Touch
          </h2>
          <p className="text-sm md:text-base text-center mb-6">
            We'd love to hear from you! Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              ></textarea>
            </div>
            <div className="text-center">
              <motion.button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>
          {/* ✅ Added text under form */}
          <p className="mt-6 text-sm md:text-base text-center text-base-content/70 max-w-md mx-auto">
            We typically respond within 24 hours. Your message helps us improve
            and serve you better.
          </p>
        </motion.div>
      </div>
    </Container>
  );
};

export default Contact;
