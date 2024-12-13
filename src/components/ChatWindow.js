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
import { current } from "@reduxjs/toolkit";

const ChatWindow = ({ activeConversation }) => {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const user = useSelector(userAuthed);
  const {
    activeConversationMessages,
    sendMessage,
    deleteConversation,
    deleteMessages,
    fetchMessages,
    hasMoreMessages,
    setUserIsTyping,
    setUserHasStoppedTyping,
    userTyping,
  } = useSocketContext();
  const inputRef = useRef(null);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const messagesContainerRef = useRef(null);
  const observerRef = useRef(null);
  const pageRef = useRef(0);
  const typingRef = useRef(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (
        newMessage &&
        newMessage.trim().length !== "" &&
        newMessage.trim() !== "" &&
        newMessage.trim().length <= 15 &&
        activeConversation
      ) {
        sendMessage(newMessage);
        setNewMessage("");
        inputRef.current.focus();
      }
    }
  };

  const reScroll = () => {
    messagesContainerRef.current.scrollIntoView({
      block: "end",
    });
  };

  const getMoreMessages = () => {
    fetchMessages(activeConversation?._id, pageRef.current + 1);
    pageRef.current += 1;
    setCanLoadMore(true);
    console.log("Getting more messages", "status of fetching", hasMoreMessages);
  };

  useEffect(() => {
    const options = {
      root: messagesContainerRef.current,
      margin: "0px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && canLoadMore && hasMoreMessages) {
        setCanLoadMore(false);
        getMoreMessages();
      }
    }, options);

    const sentinel = messagesContainerRef.current.lastElementChild;
    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeConversation, activeConversationMessages, hasMoreMessages]);

  useEffect(() => {
    if (activeConversation && hasMoreMessages) {
      setCanLoadMore(true);
      pageRef.current = 0;
    }
  }, [activeConversation, hasMoreMessages]);

  useEffect(() => {
    if (newMessage.length > 0 && typingRef.current === false) {
      setUserIsTyping(activeConversation?._id);
      typingRef.current = true;
    }

    if (newMessage.length === 0 && typingRef.current === true) {
      setUserHasStoppedTyping(activeConversation?._id);
      typingRef.current = false;
    }
  }, [newMessage]);

  return (
    <div className="messages-container">
      <div className="messages-header">
        <div
          className="messages-header-user"
          onClick={() => navigate(`/${activeConversation?.user?.username}`)}
        >
          <img src={activeConversation?.user?.picture} alt="user" />
          <h1
            onClick={() => navigate(`/${activeConversation?.user?.username}`)}
          >
            {activeConversation?.user?.firstName +
              " " +
              activeConversation?.user?.surName}
          </h1>
        </div>
        <div className="messages-header-options">
          <div className="messages-header-option">
            <DeleteForeverRoundedIcon
              onClick={() => deleteConversation(activeConversation._id)}
              sx={{ fontSize: 30, color: "#a7c750", cursor: "pointer" }}
            />
          </div>
          {/* <div className="messages-header-option">
            <DeleteForeverRoundedIcon
              onClick={() => deleteMessages(activeConversation._id)}
              sx={{ fontSize: 30, color: "#a7c750", cursor: "pointer" }}
            />
          </div> */}
        </div>
      </div>
      <div className="messages-body">
        <div className="msg-container" ref={messagesContainerRef}>
          <div
            className={
              userTyping
                ? "messages-footer-status left"
                : "messages-footer-status"
            }
          >
            {userTyping
              ? activeConversation?.user?.firstName + " is typing..."
              : activeConversation?.lastMessage?.sender === user._id &&
                (activeConversation?.lastMessage?.status === "sent"
                  ? "Sent"
                  : "seen")}
          </div>
          {activeConversationMessages?.map((message, index) => (
            <Message key={index} msg={message} curUser={user} />
          ))}
        </div>
      </div>
      <div className="messages-footer">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => {
            reScroll();
            setNewMessage(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <SendRoundedIcon
          onClick={() => {
            if (newMessage && newMessage.trim !== "" && activeConversation) {
              sendMessage(newMessage);
              setNewMessage("");
              inputRef.current.focus();
            }
          }}
          className="message-send"
          sx={{ fontSize: 23, color: "#a7c750", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
