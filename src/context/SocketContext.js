import { createContext, useState, useEffect, useContext, useRef } from "react";
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
  // const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [newConversationsFetched, setNewConversationsFetched] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const socket = useRef(null);

  const user = useSelector(userAuthed);
  const [activeConversationMessages, setActiveConversationMessages] = useState(
    []
  );
  const [activeConversation, setActiveConversation] = useState(null);
  const activeConversationRef = useRef(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const unreadMessagesRef = useRef([]);
  const conversationsRef = useRef([]);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
  });

  const setUserIsTyping = (conversationId) => {
    socket.current?.emit("typing", conversationId);
  };

  const setUserHasStoppedTyping = (conversationId) => {
    socket.current?.emit("stopTyping", conversationId);
  };

  const setActiveConversationFunc = (conversationId) => {
    if (conversationId === null || !conversationId) {
      setActiveConversation(null);
      setActiveConversationMessages(null);
      activeConversationRef.current = null;
      return;
    }

    if (activeConversationRef.current?._id === conversationId) return;

    const conversation = conversations.find((c) => c._id === conversationId);
    activeConversationRef.current = conversation;
    setActiveConversation(conversation);
    setActiveConversationMessages([]);
    fetchMessages(conversationId, 0);
    messageSeen(conversationId);
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
        if (page !== 0) {
          {
            setActiveConversationMessages((prev) => [
              ...prev,
              ...decryptedMessages,
            ]);
          }
        } else {
          setActiveConversationMessages(decryptedMessages);
        }
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
      const { data } = await api.get("api/notification");
      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMeesagesNotifications = async () => {
    try {
      const { data } = await api.get("api/notification/messages");
      if (data) {
        // alert(data);
        setUnreadMessages(data);
        unreadMessagesRef.current = data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConversations = async () => {
    try {
      const { data } = await api.get("api/message/conversations");
      if (data && socket.current) {
        const converationsFormatted = data.map((c) => {
          if (c?.lastMessage?.message) {
            const lastMessage = decrypt(c?.lastMessage?.message);
            c.lastMessage.message = lastMessage;
          }
          return c;
        });
        const conversationIds = data.map((c) => {
          socket.current.emit("joinConversation", c._id);
        });

        setConversations(converationsFormatted);
        conversationsRef.current = converationsFormatted;
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

  const markMessageRead = async (conversationId) => {
    try {
      const { data } = await api.put(
        `api/notification/mark-read/${conversationId}`
      );
      if (data) {
        setUnreadMessages((prev) =>
          prev.filter((m) => m._id !== conversationId)
        );
      }
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
        socket?.current?.emit("leaveConversation", conversationId);
        setConversations((prev) =>
          prev.filter((c) => c._id !== conversationId)
        );
        setActiveConversationMessages([]);
        setActiveConversation(null);
        activeConversationRef.current = null;
        conversationsRef.current = conversationsRef.current.filter(
          (c) => c._id !== conversationId
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const deleteMessages = async (conversationId) => {
  //   try {
  //     const deleted = await api.delete(
  //       `api/message/messages/${conversationId}`
  //     );
  //     if (deleted) {
  //       setActiveConversationMessages([]);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const newConversation = async (userId) => {
    try {
      await api.post("api/message/conversation", {
        receiverId: userId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const messageSeen = (conversationId) => {
    socket.current.emit("messageSeen", {
      conversationId,
    });

    setUnreadMessages((prev) =>
      prev.filter((m) => m.conversation !== conversationId)
    );

    unreadMessagesRef.current = unreadMessagesRef.current.filter(
      (m) => m.conversation !== conversationId
    );

    setConversations((prev) =>
      prev.map((c) => {
        if (c._id === conversationId) {
          return {
            ...c,
            lastMessage: {
              ...c.lastMessage,
              status: "seen",
            },
          };
        }
        return c;
      })
    );

    conversationsRef.current = conversationsRef.current.map((c) => {
      if (c._id === conversationId) {
        return {
          ...c,
          lastMessage: {
            ...c.lastMessage,
            status: "seen",
          },
        };
      }
      return c;
    });
  };

  const sendMessage = async (message) => {
    try {
      const encryptedMessage = encrypt(message);
      const conversationId = activeConversation?._id;
      const receiverId = activeConversation?.user._id;

      socket.current.emit("newMessage", {
        message: encryptedMessage,
        conversationId,
        receiverId,
      });

      const localMessage = {
        message: message,
        sender: user.id,
        receiver: receiverId,
        conversation: conversationId,
        status: "sent",
        createdAt: new Date().toISOString(),
        visibleFor: [user.id, receiverId],
      };

      setActiveConversationMessages((prev) => [localMessage, ...prev]);

      // kinnda slow
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

      setActiveConversation((prev) => {
        return {
          ...prev,
          lastMessage: localMessage,
        };
      });

      conversationsRef.current = conversationsRef.current.map((c) => {
        if (c._id === conversationId) {
          return {
            ...c,
            lastMessage: localMessage,
          };
        }
        return c;
      });

      activeConversationRef.current = {
        ...activeConversationRef.current,
        lastMessage: localMessage,
      };
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewMessageNotification = (message, conversationId) => {
    if (activeConversationRef?.current?._id === conversationId) {
      messageSeen(conversationId);
      return;
    }

    if (
      !unreadMessagesRef.current.find(
        (m) => m?.conversation === conversationId
      ) &&
      activeConversationRef.current?._id !== conversationId
    ) {
      setUnreadMessages((prev) => [
        ...prev,
        { ...message, conversation: conversationId },
      ]);
      unreadMessagesRef.current = [
        ...unreadMessagesRef.current,
        { ...message, conversation: conversationId },
      ];
    }

    //else send to messageSeen
  };

  useEffect(() => {
    fetchConversations();
    fetchNotifications();
    fetchMeesagesNotifications();
  }, [user]);

  useEffect(() => {
    if (user) {
      const backendUrl = process.env.REACT_APP_BACKEND_URL.toString().slice(
        0,
        process.env.REACT_APP_BACKEND_URL.toString().length - 1
      );

      socket.current = io(backendUrl, {
        query: {
          userId: user.id,
        },
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        secure: true, // Important for HTTPS
      });

      socket.current?.emit("joinNotificationRoom", user.id);
      socket.current?.emit("joinConversationRoom", user.id);

      socket.current?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.current?.on("messageSeen", ({ conversationId }) => {
        if (activeConversationRef.current?._id === conversationId) {
          setActiveConversation((prev) => {
            return {
              ...prev,
              lastMessage: {
                ...prev.lastMessage,
                status: "seen",
              },
            };
          });

          activeConversationRef.current = {
            ...activeConversationRef.current,
            lastMessage: {
              ...activeConversationRef.current.lastMessage,
              status: "seen",
            },
          };
        }

        setConversations((prev) =>
          prev.map((c) => {
            if (c._id === conversationId) {
              return {
                ...c,
                lastMessage: {
                  ...c.lastMessage,
                  status: "seen",
                },
              };
            }
            return c;
          })
        );

        conversationsRef.current = conversationsRef.current.map((c) => {
          if (c._id === conversationId) {
            return {
              ...c,
              lastMessage: {
                ...c.lastMessage,
                status: "seen",
              },
            };
          }
          return c;
        });
      });

      socket.current?.on("typing", (conversationId) => {
        if (conversationId === activeConversationRef.current?._id) {
          setUserTyping(true);
        }
        setConversations((prev) =>
          prev.map((c) => {
            if (c?._id === conversationId) {
              return {
                ...c,
                typing: true,
              };
            }
            return c;
          })
        );
      });

      socket.current?.on("stopTyping", (conversationId) => {
        if (activeConversationRef.current?._id === conversationId) {
          setUserTyping(false);
        }
        setConversations((prev) =>
          prev.map((c) => {
            if (c?._id === conversationId) {
              return {
                ...c,
                typing: false,
              };
            }
            return c;
          })
        );
      });

      socket.current?.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
        apiSlice.util.invalidateTags(["Conversation"]);
      });

      socket.current?.on("clearNotifications", () => {
        setUnreadCount(0);
      });

      socket.current?.on("newConversation", (conversation) => {
        if (!conversation) {
          return;
        }

        if (conversationsRef.current.find((c) => c?._id === conversation._id)) {
          setActiveConversationFunc(conversation._id);
          return;
        }

        if (conversation?.lastMessage?.message) {
          conversation.lastMessage.message = decrypt(
            conversation.lastMessage.message
          );
        }
        setConversations((prev) => [conversation, ...prev]);
        conversationsRef.current = [conversation, ...conversationsRef.current];
        socket.current?.emit("joinConversation", conversation?._id);
      });

      socket.current?.on("newMessage", (message, conversationId) => {
        const decryptedMessage = decrypt(message.message);
        setConversations((prev) =>
          prev.map((c) => {
            if (c?._id === conversationId) {
              return {
                ...c,
                lastMessage: { ...message, message: decryptedMessage },
              };
            }
            return c;
          })
        );

        setActiveConversation((prev) => {
          if (prev?._id === conversationId) {
            return {
              ...prev,
              lastMessage: { ...message, message: decryptedMessage },
            };
          }
          return prev;
        });

        // reorder conversations
        setConversations((prev) =>
          [prev.find((c) => c._id === conversationId)].concat([
            ...prev.filter((c) => c._id !== conversationId),
          ])
        );

        if (activeConversationRef.current?._id === conversationId) {
          setActiveConversationMessages((prev) => [
            {
              ...message,
              message: decryptedMessage,
            },
            ...prev,
          ]);
        }

        handleNewMessageNotification(message, conversationId);
      });

      socket.current?.on("newMessageNoConversation", (conversation) => {
        if (conversation?.lastMessage?.message) {
          conversation.lastMessage.message = decrypt(
            conversation.lastMessage.message
          );
        }
        setConversations((prev) => [conversation, ...prev]);
        conversationsRef.current = [conversation, ...conversationsRef.current];

        socket.current?.emit("joinConversation", conversation?._id);
      });

      return () => {
        socket.current?.off("getOnlineUsers");
        socket.current?.disconnect();
      };
    }
  }, [user]);

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
    sendMessage,
    conversations,
    newConversation,
    setActiveConversationFunc,
    activeConversationMessages,
    activeConversation,
    fetchMessages,
    hasMoreMessages,
    setUserIsTyping,
    setUserHasStoppedTyping,
    userTyping,
    unreadMessages,
    messageSeen,
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};
