import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound404 from "./pages/NotFound404";
import Activate from "./pages/Activate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoutes from "./components/AuthRoutes";
import Trending from "./pages/Trending";
import Chat from "./pages/Chat";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Routes>
      {/* private routes  */}
      <Route path="/" element={<AuthRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>

      {/* public routes  */}
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate/:token" element={<Activate />} />

      {/* 404 route  */}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default App;
