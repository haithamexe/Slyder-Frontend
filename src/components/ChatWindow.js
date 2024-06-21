import React from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useNavigate } from "react-router-dom";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ChatWindow = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  // [new
  const user = useSelector(userAuthed);
  return (
    <div className="messages-container">
      <div className="messages-header">
        <div className="messages-header-user">
          <img src={currentChat?.user?.picture} alt="user" />
          <h1 onClick={() => navigate(`/${currentChat?.user?.username}`)}>
            {currentChat?.user?.firstName + " " + currentChat?.user?.surName}
          </h1>
        </div>
        <div className="messages-header-options">
          <div className="messages-header-option">
            <MoreVertRoundedIcon
              sx={{ fontSize: 30, color: "#a7c750", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className="messages-body"></div>
      <div className="messages-footer">
        <input type="text" placeholder="Type a message" />
        <SendRoundedIcon
          className="message-send"
          sx={{ fontSize: 23, color: "#a7c750", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
