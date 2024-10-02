import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import io from "socket.io-client";
import axios from "axios";
import apiSlice from "../features/api/apiSlice";
import { encrypt, decrypt } from "../utils/encryptionUtils";

const SocketContext = createContext();
const ConversationContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const useConversation = (conversationId) => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a SocketContextProvider"
    );
  }
  return context[conversationId];
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversations, setConversations] = useState({});
  const user = useSelector(userAuthed);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
  });

  // ... (keep other functions like fetchNotifications, markAllRead, etc.)

  const fetchConversations = useCallback(async () => {
    try {
      const { data } = await api.get("api/message/conversations");
      const conversationsFormatted = data.reduce((acc, c) => {
        const decryptedMessages = c.messages.map((m) => ({
          ...m,
          message: decrypt(m.message),
        }));
        const lastMessage = decryptedMessages[0];
        acc[c._id] = { ...c, messages: decryptedMessages, lastMessage };
        return acc;
      }, {});
      setConversations(conversationsFormatted);
    } catch (err) {
      console.log(err);
    }
  }, [api]);

  const updateConversation = useCallback((conversationId, updater) => {
    setConversations((prev) => ({
      ...prev,
      [conversationId]: updater(prev[conversationId]),
    }));
  }, []);

  const deleteConversation = useCallback((conversationId) => {
    setConversations((prev) => {
      const { [conversationId]: deleted, ...rest } = prev;
      return rest;
    });
  }, []);

  const newMessage = useCallback(
    async ({ message, receiverId, conversationId }) => {
      try {
        const encryptedMessage = encrypt(message);
        const { data } = await api.post("api/message/create", {
          message: encryptedMessage,
          receiverId,
        });

        if (data) {
          updateConversation(conversationId, (conversation) => ({
            ...conversation,
            lastMessage: { ...data.message, message },
            messages: [{ ...data.messages, message }, ...conversation.messages],
          }));
        }
      } catch (err) {
        console.log(err);
      }
    },
    [api, updateConversation]
  );

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.REACT_APP_BACKEND_URL, {
        query: { userId: user.id },
      });

      // ... (keep other socket event handlers)

      newSocket?.on("newMessage", ({ message, conversationId }) => {
        const decryptedMessage = decrypt(message.message);
        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          lastMessage: { ...message, message: decryptedMessage },
          messages: [
            { ...message, message: decryptedMessage },
            ...conversation.messages,
          ],
        }));
      });

      // fetchNotifications();
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
  }, [user, fetchConversations, updateConversation]);

  const conversationContextValue = useMemo(() => {
    return Object.keys(conversations).reduce((acc, id) => {
      acc[id] = {
        conversation: conversations[id],
        updateConversation: (updater) => updateConversation(id, updater),
        deleteConversation: () => deleteConversation(id),
        newMessage: (message, receiverId) =>
          newMessage({ message, receiverId, conversationId: id }),
      };
      return acc;
    }, {});
  }, [conversations, updateConversation, deleteConversation, newMessage]);

  const socketContextValue = useMemo(
    () => ({
      socket,
      onlineUsers,
      notifications,
      unreadCount,
      // markAllRead,
      // newConversation,
    }),
    [socket, onlineUsers, notifications, unreadCount]
  );

  return (
    <SocketContext.Provider value={socketContextValue}>
      <ConversationContext.Provider value={conversationContextValue}>
        {children}
      </ConversationContext.Provider>
    </SocketContext.Provider>
  );
};
