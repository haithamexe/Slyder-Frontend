import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import io from "socket.io-client";
import axios from "axios";
import apiSlice from "../features/api/apiSlice";
import { encrypt, decrypt } from "../utils/encryptionUtils";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversations, setConversations] = useState([]);
  const user = useSelector(userAuthed);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
  });

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("api/notification/");
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConversations = async () => {
    try {
      const { data } = await api.get("api/message/conversations");
      const converationsFormatted = data.map((c) => {
        const decryptedMessages = c.messages.map((m) => {
          const decryptedMessage = decrypt(m.message);
          return { ...m, message: decryptedMessage };
        });
        const lastMessage = decryptedMessages[0];
        return { ...c, messages: decryptedMessages, lastMessage };
      });
      setConversations(converationsFormatted);
    } catch (err) {
      console.log(err);
    }
  };

  const markAllRead = async () => {
    try {
      setUnreadCount(0);
      await api.put("api/notification/mark-read");
      setUnreadCount(0);
      // const res = await axios({
      //   method: "PUT",
      //   url: `${process.env.REACT_APP_BACKEND_URL}api/notification/mark-read`,
      //   withCredentials: true,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteConversation = (conversationId) => {
    setConversations((prev) => prev.filter((c) => c._id !== conversationId));
  };

  const newConversation = async (userId) => {
    try {
      await api.post("api/message/conversation", {
        receiverId: userId,
      });
      // await axios({
      //   method: "POST",
      //   url: `${process.env.REACT_APP_BACKEND_URL}api/message/conversation`,
      //   data: {
      //     receiverId: userId,
      //   },
      //   withCredentials: true,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const newMessage = async ({ message, receiverId, conversationId }) => {
    try {
      const encryptedMessage = encrypt(message);
      const { data } = await api.post("api/message/create", {
        message: encryptedMessage,
        receiverId,
      });

      if (data) {
        setConversations((prev) =>
          prev.map((c) => {
            if (c._id === conversationId) {
              return {
                ...c,
                lastMessage: { ...data.message, message },
                messages: [{ ...data.messages, message }, ...c.messages],
              };
            }
            return c;
          })
        );
      }
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

      newSocket?.emit("joinNotificationRoom", user.id);
      newSocket?.emit("joinConversationRoom", user.id);

      newSocket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket?.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
        apiSlice.util.invalidateTags(["Conversation"]);
      });

      newSocket?.on("clearNotifications", () => {
        setUnreadCount(0);
      });

      newSocket?.on("newConversation", (conversation) => {
        setConversations((prev) => [conversation, ...prev]);
      });

      newSocket?.on("newMessage", ({ message, conversationId }) => {
        const decryptedMessage = decrypt(message.message);

        setConversations((prev) =>
          prev.map((c) => {
            if (c._id === conversationId) {
              return {
                ...c,
                lastMessage: { ...message, message: decryptedMessage },
                messages: [
                  {
                    ...message,
                    message: decryptedMessage,
                  },
                  ...c.messages,
                ],
              };
            }
            return c;
          })
        );
      });

      fetchNotifications();
      fetchConversations();

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
      value={{
        socket,
        onlineUsers,
        notifications,
        unreadCount,
        markAllRead,
        deleteConversation,
        conversations,
        newConversation,
        newMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
