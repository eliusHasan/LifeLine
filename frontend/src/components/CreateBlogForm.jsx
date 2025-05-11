import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const categories = ["Technology", "Lifestyle", "Education", "Finance", "Health","Others"];

export default function CreateBlogForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    cover_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        const value = formData[key];
      
        // Append file only if it's a valid File
        if (value instanceof File) {
          form.append(key, value);
        }
        // Skip null or undefined
        else if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      }

      const res = await fetch(`${apiUrl}/api/blog/createBlog`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to Post Blog");

      const result = await res.json();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-4">📝 Create New Blog</h2>

        <div>
          <label htmlFor="cover_image" className="block mb-1 font-semibold text-gray-700">Blog Image</label>
          <input type="file" name="cover_image" id="cover_image" accept="image/*" onChange={handleChange}
            className="w-full border file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:cursor-pointer
                        hover:file:bg-blue-700 border-gray-300 rounded-lg p-2 bg-purple-50" />
        </div>

        <div>
          <label htmlFor="title" className="block mb-1 font-semibold text-gray-700">Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 font-semibold text-gray-700">Content</label>
          <textarea name="content" value={formData.content} id="content" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 bg-purple-50 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-semibold text-gray-700">Category</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400" required>
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-3 px-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl">
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
}
