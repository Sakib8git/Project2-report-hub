import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import Switch from "../../ThemeSwitch/Switch";
import { NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed w-full bg-base-100 text-base-content z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <h2 className="text-2xl sm:text-4xl font-extrabold">ReportHub</h2>
            </Link>

            {/* Main Menu */}
            <div className="flex gap-6 items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive ? "underline text-green-600" : "hover:text-green-600"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/all-issues"
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive ? "underline text-green-600" : "hover:text-green-600"
                  }`
                }
              >
                All Reports
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hidden md:block text-sm font-semibold transition ${
                    isActive ? "underline text-green-600" : "hover:text-green-600"
                  }`
                }
              >
                About
              </NavLink>

              {/* ✅ Contact link */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hidden md:block text-sm font-semibold transition ${
                    isActive ? "underline text-green-600" : "hover:text-green-600"
                  }`
                }
              >
                Contact
              </NavLink>

              {user && (
                <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    `hidden md:block text-sm font-semibold transition ${
                      isActive ? "underline text-green-600" : "hover:text-green-600"
                    }`
                  }
                >
                  Feedback
                </NavLink>
              )}
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[60vw] md:w-[10vw] bg-base-100 text-base-content overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user ? (
                      <>
                        <div className="px-4 py-3 hover:bg-[#cbeef3] hover:text-[#1A4A6C] transition font-semibold cursor-pointer">
                          {user.displayName}
                        </div>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-[#cbeef3] hover:text-[#1A4A6C] transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/feedback"
                          className="block md:hidden px-4 py-3 hover:bg-neutral hover:text-base-100 transition font-semibold"
                        >
                          Feedback
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-[#cbeef3] hover:text-[#1A4A6C] transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-[#cbeef3] hover:text-[#1A4A6C] transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-[#cbeef3] hover:text-[#1A4A6C] transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}

                    {/* ✅ About & Contact visible only on sm */}
                    <Link
                      to="/about"
                      className="block md:hidden px-4 py-3 hover:bg-neutral hover:text-base-100 transition font-semibold"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className="block md:hidden px-4 py-3 hover:bg-neutral hover:text-base-100 transition font-semibold"
                    >
                      Contact
                    </Link>

                    {/* ✅ Theme Toggle Button */}
                    <div className="px-4 py-3 transition font-semibold cursor-pointer">
                      <Switch onChange={toggleTheme} checked={theme === "dark"} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;