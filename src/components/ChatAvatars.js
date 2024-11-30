import React from "react";
import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const ChatAvatars = () => {
  const { conversations } = useSocketContext();

  return <div>ChatAvatars</div>;
};

export default ChatAvatars;
