// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
const apiUrl = import.meta.env.VITE_API_URL;

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        
        const data = await res.json(); // 👈 parse the JSON body
        console.log(data.message); 
        
        setUser(null); // clear user context
        navigate("/login"); // redirect to login page
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    logout();
  }, [navigate, setUser]);

  return <p className="text-center mt-10 text-white">Logging out...</p>;
};

export default Logout;
