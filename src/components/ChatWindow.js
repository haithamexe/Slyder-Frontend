import React from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useState, useEffect, useRef } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useNavigate } from "react-router-dom";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
} from "../features/message/messageApiSlice";
import io from "socket.io-client";
import Message from "./Message";
import axios from "axios";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import apiSlice from "../features/api/apiSlice";
import { decrypt } from "../utils/encryptionUtils";
import { useSocketContext } from "../context/SocketContext";

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatWindow = ({ currentChat }) => {
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const navigate = useNavigate();
  const user = useSelector(userAuthed);
  const { newMessage } = useSocketContext();

  // const { data: messagesData, isSuccess: messagesIsSuccess } =
  //   useGetMessagesQuery({ receiverId: currentChat?.user?._id });

  // const [createMessage, { data, isSuccess, isError }] =
  //   useCreateMessageMutation();

  // useEffect(() => {
  // Fetch initial messages
  // if (messagesIsSuccess) {
  //   setMessages(messagesData);
  // }

  // const fetchMessages = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}api/message/${currentChat?.user?._id}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setMessages(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // fetchMessages();

  // socket.emit("joinRoom", currentChat._id);

  // socket.on("newMessage", (message) => {
  //   const decryptedMessage = {
  //     ...message,
  //     message: decrypt(message.message),
  //   };

  //   setMessages((prevMessages) => [decryptedMessage, ...prevMessages]);
  //   handleScroll();
  // });

  // socket.on("messageStatusUpdated", (updatedMessage) => {
  //   setMessages((prevMessages) =>
  //     prevMessages.map((message) =>
  //       message._id === updatedMessage._id ? updatedMessage : message
  //     )
  //   );
  // });

  // Cleanup on component unmount
  // return () => {
  // socket.emit("leaveRoom", currentChat._id);
  // socket.off("newMessage");
  // socket.off("messageStatusUpdated");
  // };
  // }, [currentChat]);

  // useEffect(() => {
  // socket.on("messageStatusUpdated", (updatedMessage) => {
  //   setMessages((prevMessages) =>
  //     prevMessages.map((message) =>
  //       message._id === updatedMessage._id ? updatedMessage : message
  //     )
  //   );
  // });

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages);
    }
  }, [currentChat]);

  useEffect(() => {
    socket.emit("joinRoom", user.id);

    socket.on("newMessage", ({ message }) => {
      const decryptedMessage = decrypt(message.message);
      setMessages((prevMessages) => [
        { ...message, message: decryptedMessage },
        ...prevMessages,
      ]);
      handleScroll();
    });

    handleScroll();

    // Cleanup on component unmount
    return () => {
      socket.emit("leaveRoom", currentChat._id);
      socket.off("newMessage");
      socket.off("messageStatusUpdated");
    };
  }, []);

  const handleSendMessage = () => {
    if (sendMessage.trim() === "") return;
    newMessage({
      message: sendMessage,
      receiverId: currentChat.user._id,
      conversationId: currentChat._id,
    });
    // setMessages((prevMessages) => [
    //   {
    //     message: sendMessage,
    //     sender: user.id,
    //     receiver: currentChat.user._id,
    //     createdAt: new Date().toISOString(),
    //   },
    //   ...prevMessages,
    // ]);
    setSendMessage("");
  };

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleDeleteConvo = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}api/message/conversation/${currentChat?.user?._id}`,
        {
          withCredentials: true,
        }
      );
      await apiSlice.util.invalidateTags(["Contacts", "Conversation"]);
      // navigate("/chat");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <div
          className="messages-header-user"
          onClick={() => navigate(`/${currentChat?.user?.username}`)}
        >
          <img src={currentChat?.user?.picture} alt="user" />
          <h1 onClick={() => navigate(`/${currentChat?.user?.username}`)}>
            {currentChat?.user?.firstName + " " + currentChat?.user?.surName}
          </h1>
        </div>
        <div className="messages-header-options">
          <div className="messages-header-option">
            <DeleteForeverRoundedIcon
              onClick={handleDeleteConvo}
              sx={{ fontSize: 30, color: "#a7c750", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className="messages-body">
        <div
          className="msg-container"
          ref={scrollRef}
          onScroll={() => {
            console.log("scrolling");
          }}
        >
          {messages?.map((message, index) => (
            <Message key={index} msg={message} curUser={user} />
          ))}
        </div>
      </div>
      <div className="messages-footer">
        <input
          type="text"
          placeholder="Type a message"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SendRoundedIcon
          onClick={handleSendMessage}
          className="message-send"
          sx={{ fontSize: 23, color: "#a7c750", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
