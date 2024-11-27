import React from "react";
import { userAuthed } from "../features/user/userSlice";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthCheck = () => {
  const user = useSelector(userAuthed);
  console.log("AuthCheck", "userAuthed", user);
  return <>{user ? <Navigate to="/" /> : <Outlet />}</>;
};

export default AuthCheck;
