import { useState, useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const EditProfileContent = () => {
  const {user} = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const { setUser } = useUserContext();
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!formData) {
    return <div>Loading...</div>;
  }
 
const imageUrl = user?.profileImage
? `${user.profileImage}` // or use your actual backend domain
: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["facebook", "linkedIn", "instagram", "twitter"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      "profile_image": file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      for (const key in formData) {
        if (key === "socials") {
          for (const socialKey in formData.socials) {
            form.append(`socials[${socialKey}]`, formData.socials[socialKey]);
          }
        }
        else if (key === "profile_image") {
          if (formData.profile_image instanceof File) {
            form.append("profile_image", formData.profile_image);
          }}
        else {
          form.append(key, formData[key]);
        }
      }

      const res = await fetch(`${apiUrl}/api/auth/update`, {
        method: "PUT",
        body: form,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.json();
      setUser(result.user);
      navigate(`/author/${user.id}`);
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left Image */}
      <div className="relative w-full h-64 lg:h-full lg:w-1/3 flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-2/3 h-full overflow-y-auto p-6 lg:p-10 space-y-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                id="email"
                autoComplete="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block font-medium mb-1">Mobile</label>
              <input
                type="text"
                id="mobile"
                autoComplete="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="address" className="block font-medium mb-1">Address</label>
              <input
                type="text"
                id="address"
                autoComplete="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="facebook" className="block font-medium mb-1">Facebook</label>
              <input
                type="text"
                id="facebook"
                autoComplete="facebook"
                name="facebook"
                value={formData.socials.facebook}
                onChange={handleChange}
                placeholder="Facebook profile URL"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="linkedIn" className="block font-medium mb-1">LinkedIn</label>
              <input
                type="text"
                id="linkedIn"
                autoComplete="linkedIn"
                name="linkedIn"
                value={formData.socials.linkedIn}
                onChange={handleChange}
                placeholder="LinkedIn profile URL"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="twitter" className="block font-medium mb-1">Twitter</label>
              <input
                type="text"
                id="twitter"
                autoComplete="twitter"
                name="twitter"
                value={formData.socials.twitter}
                onChange={handleChange}
                placeholder="Twitter profile URL"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="instagram" className="block font-medium mb-1">Instagram</label>
              <input
                type="text"
                id="instagram"
                autoComplete="instagram"
                name="instagram"
                value={formData.socials.instagram}
                onChange={handleChange}
                placeholder="Instagram profile URL"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Profile Image
            </label>
            <input
              type="file"
              id="profile_image"
              autoComplete="profile_image"
              name="profile_image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-700
                        cursor-pointer"
            />
          </div>


          <div>
            <label htmlFor="aboutMe" className="block font-medium mb-1">About Me</label>
            <textarea
              name="aboutMe"
              id="aboutMe"
              autoComplete="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              rows="6"
              placeholder="Tell something about yourself"
              className="w-full px-4 py-2 border rounded-md"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileContent;
