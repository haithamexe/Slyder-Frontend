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
  const user = useSelector(userAuthed);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "api/notification/" + user.id
      );
      console.log(res.data, "notifications");
      setNotification(res.data);
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

      // newSocket?.on("getOnlineUsers", (users) => {
      //   setOnlineUsers(users);
      // });

      // newSocket?.emit("joinNotificationRoom", user.id);

      newSocket?.on("newNotification", (notification) => {
        setNotification((prev) => [notification, ...prev]);
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
    <SocketContext.Provider value={{ socket, onlineUsers, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};
