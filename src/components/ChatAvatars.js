import React from "react";
import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const ChatAvatars = () => {
  const { conversations, onlineUsers } = useSocketContext();

  return (
    <>
      {conversations?.map((conversation, index) => (
        <div className="chat-mobile-user">
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
        </div>
      ))}
    </>
  );
};

export default ChatAvatars;
