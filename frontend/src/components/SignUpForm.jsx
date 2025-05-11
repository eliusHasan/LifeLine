import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
const apiUrl = import.meta.env.VITE_API_URL;

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const submissionData = new FormData();
      for (const key in formData) {
        submissionData.append(key, formData[key]);
      }
      if (profileImage) {
        submissionData.append("profile_image", profileImage);
      }

      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        body: submissionData,
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        navigate("/");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-800 text-white px-4">
      <div className="w-full md:w-4/5 lg:w-4/5 xl:w-4/5 bg-teal-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-cyan-300 mb-6 text-center">
          Create An Account
        </h2>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              className="p-2 rounded bg-white text-black"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />

            <input
              id="address"
              type="text"
              name="address"
              placeholder="Address"
              className="p-2 rounded bg-white text-black"
              value={formData.address}
              onChange={handleChange}
              autoComplete="address"
            />

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 rounded bg-white text-black"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <input
              id="mobile"
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="p-2 rounded bg-white text-black"
              value={formData.mobile}
              onChange={handleChange}
              autoComplete="tel"
            />
            
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create Password"
              className="p-2 rounded bg-white text-black"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="p-2 rounded bg-white text-black"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="profile_image" className="block mb-1 text-sm">Upload Profile Image</label>
              <input
                id="profile_image"
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-white file:bg-white file:text-black file:rounded file:p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
