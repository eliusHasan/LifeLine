import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
const apiUrl = import.meta.env.VITE_API_URL;

const HomeContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/blog/allBlogs`);

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default HomeContent;
