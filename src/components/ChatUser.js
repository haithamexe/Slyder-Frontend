import React from "react";
import { useGetConversationQuery } from "../features/message/messageApiSlice";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { clearMessages } from "../features/message/messageSlice";
import { useDispatch } from "react-redux";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { useSocketContext } from "../context/SocketContext";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const ChatUser = ({ conversation, setCurrentChat }) => {
  const user = useSelector(userAuthed);
  const {
    onlineUsers,
    setActiveConversationFunc,
    messageSeen,
    unreadMessages,
  } = useSocketContext();

  return (
    <div
      className="chat-user"
      onClick={() => {
        setActiveConversationFunc(conversation._id);
        messageSeen(conversation._id);
        // setCurrentChat(conversation);
      }}
    >
      <div className="chat-user-img">
        <img src={conversation?.user?.picture} alt="user" />
      </div>
      {onlineUsers.includes(conversation?.user?._id) ? (
        <CircleRoundedIcon
          className="chat-user-status-icon"
          sx={{ fontSize: 15, color: "#a7c750" }}
        />
      ) : (
        <CircleRoundedIcon
          className="chat-user-status-icon"
          sx={{ fontSize: 14, color: "grey" }}
        />
      )}
      <div className="chat-user-info">
        <h1>
          {conversation?.user?.firstName + " " + conversation?.user?.surName}
        </h1>
        <p>
          {conversation?.typing
            ? "Typing..."
            : conversation?.lastMessage?.message.toString().length > 15
            ? conversation?.lastMessage?.message.toString().substring(0, 15) +
              "..."
            : conversation?.lastMessage?.message.toString()}
          <div>
            <span className="message-status">
              {conversation?.lastMessage?.sender === user._id &&
                (conversation?.lastMessage?.status === "sent"
                  ? "Sent"
                  : "seen")}
            </span>
            <span>
              {conversation?.lastMessage?.createdAt &&
                formatTimeAgo(conversation?.lastMessage?.createdAt)}
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default ChatUser;
