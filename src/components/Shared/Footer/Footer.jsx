import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
        <Container>
        <div className=" mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-green-500">ReportHub</h2>
            <p className="mt-3 text-sm">
              A public infrastructure issue reporting system. Citizens, Admins,
              and Staff working together for a better city.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-green-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/all-issues" className="hover:text-green-400">
                  All Reports
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-green-400">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-green-400">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="hover:text-green-400">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-green-400">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-400">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-green-400">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ReportHub. All rights reserved.
        </div>
    </Container>
      </footer>
  );
};

export default Footer;
