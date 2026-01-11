import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaGlobe } from "react-icons/fa";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-bold ">ReportHub</h2>
            <p className="mt-4 text-sm leading-relaxed text-base-content/70">
              A public infrastructure issue reporting system. Citizens, Admins,
              and Staff working together for a better city.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Contact Us
            </h3>
            <p className="text-sm">
              Email:{" "}
              <a href="sakib19256@gmail.com" className="hover:text-primary">
                sakib19256@gmail.com
              </a>
            </p>
            <p className="text-sm mt-2">
              Phone:{" "}
              <a href="tel:+8801303330278" className="hover:text-primary">
                +8801303330278
              </a>
            </p>
            <p className="text-sm mt-2">Khulna, Bangladesh</p>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Stay Updated
            </h3>
            <p className="text-sm mb-4 text-base-content/70">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="mt-12 border-t border-base-300 pt-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://www.facebook.com/sakib30278"
              className="text-base-content/70 hover:text-primary transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/nazmus-sakib-anik"
              className="text-base-content/70 hover:text-primary transition"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://github.com/Sakib8git"
              className="text-base-content/70 hover:text-primary transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://sakib-portfolio.pages.dev"
              className="text-base-content/70 hover:text-primary transition"
            >
              <FaGlobe size={20} />
            </a>
          </div>
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} ReportHub. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
