import { useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

const Menu = () => {
  const {user} = useUserContext();
  const log_status = !!user; 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-sky-950 text-white fixed w-full top-0 left-0 z-10 shadow-md">
      <div className="flex justify-between items-center h-16 px-5">
        <h1 className="text-2xl md:text-3xl font-bold">
          <Link to="/">LifeLines</Link>
        </h1>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex-col md:flex-row md:flex gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-sky-950 md:bg-transparent ${
            isOpen ? "flex" : "hidden"
          } md:items-center px-5 md:px-0 pb-4 md:pb-0`}
        >
          {log_status ? (
            <>
              <li>
                <Link
                  to="/createBlog"
                  className="block py-2 px-3 rounded hover:bg-sky-700 transition"
                >
                  Create Blog
                </Link>
              </li>
              <li>
                <Link
                  to={`/author/${user.id}`}
                  className="block py-2 px-3 rounded hover:bg-sky-700 transition"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block py-2 px-3 rounded hover:bg-sky-700 transition"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signup"
                  className="block py-2 px-3 rounded hover:bg-sky-700 transition"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 rounded hover:bg-sky-700 transition"
                >
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
