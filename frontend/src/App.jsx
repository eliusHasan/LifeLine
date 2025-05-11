import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreateBlog from "./pages/CreateBlog";
import SingleBlog from "./pages/SingleBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/author/:id" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/createBlog" element={<CreateBlog />} />
      <Route path="/blog/:id" element={<SingleBlog />} />
    </Routes>
  );
}

export default App;
