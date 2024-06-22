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
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import io from "socket.io-client";
import Message from "./Message";
import axios from "axios";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import apiSlice from "../features/api/apiSlice";
// import {
//   addMessage,
//   setMessages,
//   clearMessages,
//   selectMessages,
// } from "../features/message/messageSlice";
// import { useDispatch, useSelector } from "react-redux";

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatWindow = ({ currentChat }) => {
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const navigate = useNavigate();
  const user = useSelector(userAuthed);
  const { data: messagesData, isSuccess: messagesIsSuccess } =
    useGetMessagesQuery({ receiverId: currentChat?.user?._id });

  const [createMessage, { data, isSuccess, isError }] =
    useCreateMessageMutation();

  useEffect(() => {
    // Fetch initial messages
    // if (messagesIsSuccess) {
    //   setMessages(messagesData);
    // }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/message/${currentChat?.user?._id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    // Join the conversation room
    socket.emit("joinRoom", currentChat._id);

    // Listen for new messages
    socket.on("newMessage", (message) => {
      // const messagesArray = messages;
      // messagesArray.unshift(message);
      // setMessages(messagesArray);
      // setMessages((prevMessages) => [...prevMessages, message]);

      setMessages((prevMessages) => [message, ...prevMessages]);
      handleScroll();
    });

    socket.on("messageStatusUpdated", (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === updatedMessage._id ? updatedMessage : message
        )
      );
    });

    // Cleanup on component unmount
    return () => {
      socket.emit("leaveRoom", currentChat._id);
      socket.off("newMessage");
      socket.off("messageStatusUpdated");
    };
  }, [currentChat]);

  const handleSendMessage = () => {
    if (sendMessage.trim() === "") return;
    createMessage({ receiverId: currentChat.user._id, message: sendMessage });
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
      navigate("/chat");
      // window.location.reload();
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
          {messages.map((message) => (
            <Message key={message?._id} msg={message} curUser={user} />
          ))}
        </div>
      </div>
      <div className="messages-footer">
        <input
          type="text"
          placeholder="Type a message"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
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
