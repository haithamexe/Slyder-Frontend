import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useSelector(userAuthed);

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.REACT_APP_BACKEND_URL, {
        query: {
          userId: user.id,
        },
      });
      setSocket(newSocket);
    } else {
      socket?.close();
      setSocket(null);
    }

    socket?.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket?.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
