import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

const SocketTest = () => {
  useEffect(() => {
    console.log("socket test");
    socket.emit("send_message", { message: "hello" });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <></>;
};

export default SocketTest;
