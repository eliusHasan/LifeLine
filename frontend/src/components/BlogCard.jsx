import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* Cover Image */}
      <Link to={`/blog/${blog._id}`}>
        <img
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
          src={`${blog.coverImage}`}
          alt={blog.title}
        />
      </Link>

      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h2>

        {/* Content Snippet (first 100 characters) */}
        <p className="text-gray-600 mb-2 line-clamp-3">
          {blog.content.substring(0, 100)}...
        </p>

        {/* "See more" link */}
        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-500 text-sm hover:underline mb-4 inline-block"
        >
          See more
        </Link>

        {/* Author and Date */}
        <div className="flex items-center justify-between mt-4">
          <Link to={`/author/${blog.authorID._id}`}>
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={`${blog.authorID.profileImage}`}
                alt={blog.authorID.name}
              />
              <span className="text-sm text-gray-700">{blog.authorID.name}</span>
            </div>
          </Link>
          <span className="text-sm text-gray-500"> {new Date(blog.createdAt).toLocaleDateString("en-US")}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
