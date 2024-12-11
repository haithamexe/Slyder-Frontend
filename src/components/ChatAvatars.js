import React from "react";
import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const ChatAvatars = () => {
  const { conversations, onlineUsers, setActiveConversationFunc, messageSeen } =
    useSocketContext();

  return (
    <>
      {conversations?.map((conversation, index) => (
        <div className="chat-mobile-user" key={index}>
          <div className="chat-user-img">
            <img
              src={conversation?.user?.picture}
              alt="user"
              onClick={() => {
                setActiveConversationFunc(conversation?._id);
                messageSeen(conversation?._id);
              }}
            />
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
        </div>
      ))}
    </>
  );
};

export default ChatAvatars;
