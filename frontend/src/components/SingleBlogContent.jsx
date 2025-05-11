import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const SingleBlogContent = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
  
    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`${apiUrl}/api/blog/singleBlog/${id}`,{
              method: "GET",
              credentials: "include",
          });
          if (res.status === 401) {
            setBlog("unauthorized");
            return;
          }

          const data = await res.json();
          setBlog(data);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setBlog("error");
        }
      };
    
      fetchBlog();
    }, [id]);
  
    if (blog === null) return <div>Loading...</div>;
    if (blog === "unauthorized") return <div className="text-red-500 font-bold align-middle mt-24 text-center text-xl">Please log in first to view this blog.</div>;
    if (blog === "error") return <div className="text-red-500 text-center mt-10 text-xl">Something went wrong. Please try again later.</div>;

  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-fuchsia-100">
        <img
          src={`${blog.coverImage}`}
          alt="Cover"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">Category: {blog.category}</p>
        <Link to={`/author/${blog.authorID._id}`}>
            <div className="flex items-center mb-6">
            <img
                src={`${blog.authorID.profileImage}`}
                alt={blog.authorID.name}
                className="w-10 h-10 rounded-full mr-3"
            />
            <p className="text-sm font-medium">{blog.authorID.name}</p>
            </div>
        </Link>
        <div className="text-lg leading-relaxed">
          {blog.content}
        </div>
      </div>
    );
}

export default SingleBlogContent;