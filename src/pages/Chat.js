import "../styles/chat.css";
import { useState, useEffect } from "react";
import ChatPlay from "../components/ChatPlay";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <div className="chat">
      <ChatList />
      <ChatPlay />
    </div>
  );
};

export default Chat;
