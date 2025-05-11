import { Link, useParams } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { useState,useEffect } from "react";

const ProfileCard = () => {
  const {user} = useUserContext();
  const { id } = useParams();
  const [profile,setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/auth/singleUser/${id}`,{
            method: "GET",
            credentials: "include",
        });
        if (res.status === 401) {
          setProfile("unauthorized");
          return;
        }
        const data = await res.json();
        setProfile(data);

        const blogRes = await fetch(`${apiUrl}/api/blog/user/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const blogData = await blogRes.json();
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setProfile("error");
      }
    };
  
    fetchProfile();
  }, [id]);


  if (!profile) {
    return <div>Loading...</div>;
  }
  if (profile === "unauthorized") return <div className="text-red-500 text-center mt-10 text-xl">Please log in first to view the User.</div>;
  if (profile === "error") return <div className="text-red-500 text-center mt-10 text-xl">Something went wrong. Please try again later.</div>;

  const imageUrl = profile?.profileImage
? `${profile.profileImage}` // or use your actual backend domain
: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
 
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left Fixed Image */}
      <div className="relative w-full h-64 lg:h-full lg:w-1/3 flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>

      {/* Right Scrollable Content */}
      <div className="w-full lg:w-2/3 h-full overflow-y-auto p-6 lg:p-10 space-y-10">
        {/* Edit Profile Button */}
        {user?.id === id && (
          <div className="flex justify-center w-full">
            <Link
              to="/editprofile"
              className="bg-green-500 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-md shadow-md transition duration-200 w-full text-center"
            >
              Edit Profile
            </Link>
          </div>
        )}

        {/* Contact Card */}
        <div className="bg-white shadow-md rounded-xl">
          <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold rounded-t-xl">
            Contact Me
          </div>
          <div className="flex flex-col lg:flex-row p-6 gap-6">
            {/* Left Info */}
            <div className="lg:w-1/2 space-y-3">
              <div>
                <span className="font-medium">Name:</span> {profile.name}
              </div>
              <div>
                <span className="font-medium">Address:</span> {profile.address}
              </div>
              <div>
                <span className="font-medium">Mobile:</span> {profile.mobile}
              </div>
              <div>
                <span className="font-medium">Instagram:</span> {profile.socials.instagram || "N/A"}
              </div>
            </div>

            {/* Right Info */}
            <div className="lg:w-1/2 space-y-3">
              <div>
                <span className="font-medium">Email:</span> {profile.email || "N/A"}
              </div>
              <div>
                <span className="font-medium">Facebook:</span> {profile.socials.facebook || "N/A"}
              </div>
              <div>
                <span className="font-medium">LinkedIn:</span> {profile.socials.linkedIn || "N/A"}
              </div>
              <div>
                <span className="font-medium">Twitter:</span> {profile.socials.twitter || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700 text-base md:text-lg leading-7 whitespace-pre-line">
            {profile.aboutMe}
          </p>
        </div>

        {/* My Blogs */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Blogs</h2>
          {blogs.length > 0 ? (
            <div className="text-gray-700 text-base md:text-lg leading-7 space-y-2">
              {blogs.map((blog, index) => (
                <Link to={`/blog/${blog._id}`} key={blog._id}>
                  <p className="leading-[3] font-bold hover:text-blue-700">{index + 1}. {blog.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
