// src/pages/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
const apiUrl = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-800 text-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-teal-900 p-8 rounded-lg shadow-lg">
        {/* Left - Welcome Section */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-white rounded-full mb-4 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-teal-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-cyan-300 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300">
            Login to continue exploring amazing features.
          </p>
        </div>

        {/* Right - Login Form */}
        <div className="bg-teal-800 p-6 rounded-lg border border-white">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            Login to Your Account
          </h2>
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-white text-black"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-white text-black"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
