import React from "react";

const Message = ({ msg, curUser }) => {
  return (
    <div
      className={
        msg?.sender === curUser.id
          ? "msg-content msg-sender"
          : " msg-content msg-receiver"
      }
    >
      <p>{msg?.message}</p>
    </div>
  );
};

export default Message;
