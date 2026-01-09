import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <h2
                className="text-2xl sm:text-4xl font-extrabold 
               bg-gradient-to-r from-green-500 to-blue-600 
               bg-clip-text text-transparent"
              >
                ReportHub
              </h2>
            </Link>

            {/* Main Menu */}
            <div className="flex gap-6 items-center">
              <Link
                to="/"
                className="text-sm font-semibold hover:text-green-600 transition"
              >
                Home
              </Link>
              <Link
                to="/all-issues"
                className="text-sm font-semibold hover:text-green-600 transition"
              >
                All Reports
              </Link>
              {/* ✅ About & Feedback visible only on md+ */}
              <Link
                to="/about"
                className="hidden md:block text-sm font-semibold hover:text-blue-500 transition"
              >
                About
              </Link>
              <Link
                to="/feedback"
                className="hidden md:block text-sm font-semibold hover:text-blue-500 transition"
              >
                Feedback
              </Link>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
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
                <div className="absolute rounded-xl shadow-md w-[60vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {/* ✅ About & Feedback visible only on sm */}
                    <Link
                      to="/about"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      About
                    </Link>
                    <Link
                      to="/feedback"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Feedback
                    </Link>

                    {user ? (
                      <>
                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                          {user.displayName}
                        </div>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
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
