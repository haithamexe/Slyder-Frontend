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

let newSocket = null;

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [newConversationsFetched, setNewConversationsFetched] = useState(false);
  const user = useSelector(userAuthed);
  const [activeConversationMessages, setActiveConversationMessages] = useState(
    []
  );
  const [activeConversation, setActiveConversation] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
  });

  const setActiveConversationFunc = (conversationId) => {
    const conversation = conversations.find((c) => c._id === conversationId);
    setActiveConversation(conversation);
    console.log("tried to set active conversation", conversation);

    if (conversationId !== activeConversation?._id) {
      setActiveConversationMessages([]);
      fetchMessages(conversationId, 0);
    }
  };

  const fetchMessages = async (conversationId, page) => {
    try {
      const { data } = await api.get(
        `api/message/messages/${conversationId}/${page}`
      );
      if (data && data.length > 0) {
        const decryptedMessages = data.map((m) => {
          const decryptedMessage = decrypt(m.message);
          return { ...m, message: decryptedMessage };
        });
        setActiveConversationMessages((prev) => [
          ...prev,
          ...decryptedMessages,
        ]);
      } else {
        setHasMoreMessages(false);
        console.log("No more messages");
      }
    } catch (err) {
      setHasMoreMessages(false);
      console.log("No more messages");
    }
  };

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
      console.log(data);
      if (data) {
        const converationsFormatted = data.map((c) => {
          if (c?.lastMessage?.message) {
            const lastMessage = decrypt(c?.lastMessage?.message);
            c.lastMessage.message = lastMessage;
          }
          return c;
        });
        const conversationIds = data.map((c) => c._id);
        console.log(conversationIds);
        newSocket.emit("joinConversations", conversationIds);
        setConversations(converationsFormatted);
      }
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

  const deleteConversation = async (conversationId) => {
    try {
      const deleted = await api.delete(
        `api/message/conversation/${conversationId}`
      );
      if (deleted) {
        setConversations((prev) =>
          prev.filter((c) => c._id !== conversationId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMessages = async (conversationId) => {
    try {
      const deleted = await api.delete(
        `api/message/messages/${conversationId}`
      );
      if (deleted) {
        setActiveConversationMessages([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newConversation = async (userId) => {
    try {
      await api.post("api/message/conversation", {
        receiverId: userId,
      });
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

  const sendMessage = async (message) => {
    try {
      const encryptedMessage = encrypt(message);
      const conversationId = activeConversation._id;
      const receiverId = activeConversation?.user;
      // const { data } = await api.post("api/message/create", {
      //   message: encryptedMessage,
      //   conversationId,
      // });

      const data = newSocket.emit("newMessage", {
        message: encryptedMessage,
        conversationId,
        receiverId,
      });

      const localMessage = {
        message: message,
        sender: user.id,
        receiver: receiverId,
        conversation: conversationId,
        createdAt: new Date().toISOString(),
      };

      if (data) {
        setActiveConversationMessages((prev) => [localMessage, ...prev]);
      }
      //kinnda slow
      if (conversations[0]?._id !== conversationId) {
        setConversations(
          [conversations.find((c) => c._id === conversationId)].concat([
            ...conversations.filter((c) => c._id !== conversationId),
          ])
        );
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c._id === conversationId) {
            return {
              ...c,
              lastMessage: localMessage,
            };
          }
          return c;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      newSocket = io(process.env.REACT_APP_BACKEND_URL, {
        query: {
          userId: user.id,
        },
        withCredentials: true,
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
        if (conversation?.lastMessage?.message) {
          conversation.lastMessage.message = decrypt(
            conversation.lastMessage.message
          );
        }
        console.log(conversation);
        setConversations((prev) => [conversation, ...prev]);
        newSocket?.emit("joinConversation", conversation?._id);
      });

      newSocket?.on("newMessage", ({ message, conversationId }) => {
        console.log(message, conversationId);
        console.log(activeConversation?._id + "  " + conversationId);
        const decryptedMessage = decrypt(message.message);

        if (activeConversation?._id === conversationId) {
          setActiveConversationMessages((prev) => [
            { ...message, message: decryptedMessage },
            ...prev,
          ]);
        }

        setConversations((prev) =>
          prev.map((c) => {
            if (c._id === conversationId) {
              return {
                ...c,
                lastMessage: { ...message, message: decryptedMessage },
              };
            }
            return c;
          })
        );
        if (!conversations[0]?._id === conversationId) {
          setConversations((prev) =>
            prev.sort((a, b) => {
              return new Date(b.updatedAt) - new Date(a.updatedAt);
            })
          );
        }
      });
      if (!notifications) {
        fetchNotifications();
      }
      fetchConversations();

      return () => {
        newSocket?.off("getOnlineUsers");
        newSocket?.disconnect();
      };
    } else {
      setSocket(null);
      setOnlineUsers([]);
    }
  }, [user, activeConversation]);

  useEffect(() => {
    setHasMoreMessages(true);
  }, [activeConversation]);

  const socketValue = {
    socket,
    onlineUsers,
    notifications,
    unreadCount,
    markAllRead,
    deleteConversation,
    deleteMessages,
    sendMessage,
    conversations,
    newConversation,
    newMessage,
    setActiveConversationFunc,
    activeConversationMessages,
    activeConversation,
    fetchMessages,
    hasMoreMessages,
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};
