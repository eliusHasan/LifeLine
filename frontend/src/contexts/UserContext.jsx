import { createContext, useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  //Fetch user info from cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not logged in ...");
        const data = await res.json();
        setUser(data?.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
