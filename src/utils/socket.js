import io from "socket.io-client";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const socket = io("http://localhost:8000"); // Replace with your server URL

export const initializeSocket = (userId) => {
  socket.emit("join", userId);
};

export default socket;
