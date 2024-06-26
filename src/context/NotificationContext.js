import React, { createContext, useState, useEffect, useContext } from "react";
import socket from "../utils/socket";
// import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // const { user } = useAuth();
  const user = useSelector(userAuthed);

  useEffect(() => {
    if (user) {
      // Fetch initial notifications
      fetchNotifications();
      const socket = io(process.env.REACT_APP_BACKEND_URL); // Replace with your server URL

      socket.emit("joinNotificationRoom", user.id);
      // const socket = io(process.env.REACT_APP_BACKEND_URL, {
      //   query: {
      //     userId: user.id,
      //   },
      // }); // Replace with your server URL
      // Replace with your server URL
      // Listen for new notifications
      socket.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
    }

    return () => {
      // socket.off("newNotification");
      // socket.disconnect();
    };
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/notification/${user.id}`
      );
      const data = res.data;
      const tryarr = ["yes", "no"];
      setNotifications(tryarr);
      // setUnreadCount(data.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications/mark-read", {
        method: "PUT",
        body: JSON.stringify({ userId: user.id }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
