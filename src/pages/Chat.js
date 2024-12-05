import "../styles/chat.css";
import { useState, useEffect } from "react";
import ChatPlay from "../components/ChatPlay";
import ChatList from "../components/ChatList";
import Blob from "../components/Blob";

const Chat = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [pos, setPos] = useState({ x: 650, y: 200 });

  const handleMouseMove = (e) => {
    setTimeout(() => {
      setPos({ x: e.clientX - 275, y: e.clientY - 275 });
    }, 180);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div onMouseMove={handleMouseMove} className="chat">
      {/* <Blob x={pos.x} y={pos.y} /> */}

      <ChatList />
      {width > 1300 ? <ChatPlay /> : null}
    </div>
  );
};

export default Chat;
