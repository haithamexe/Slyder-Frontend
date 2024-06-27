import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import io from "socket.io-client";
import axios from "axios";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotification] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useSelector(userAuthed);

  const fetchNotifications = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}api/notification/`,
        withCredentials: true,
      });
      console.log(res.data, "notifications");
      setNotification(res.data);
      setUnreadCount(res.data.filter((n) => !n.read).length);
    } catch (err) {
      console.log(err);
    }
  };

  const markAllRead = async () => {
    try {
      const res = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BACKEND_URL}api/notification/mark-read`,
        withCredentials: true,
      });
      setUnreadCount(0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.REACT_APP_BACKEND_URL, {
        query: {
          userId: user.id,
        },
      });

      newSocket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket?.emit("joinNotificationRoom", user.id);

      newSocket?.on("newNotification", (notification) => {
        setNotification((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      newSocket?.on("clearNotifications", () => {
        setUnreadCount(0);
      });

      fetchNotifications();

      return () => {
        newSocket?.off("getOnlineUsers");
        newSocket?.off("joinNotificationRoom", user.id);
        newSocket?.close();
      };
    } else {
      setSocket(null);
      setOnlineUsers([]);
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, notifications, unreadCount, markAllRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
