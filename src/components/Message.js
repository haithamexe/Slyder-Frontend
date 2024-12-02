import { useState } from "react";

const Message = ({ msg, curUser }) => {
  const [showTime, setShowTime] = useState(false);

  const formatTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    // hours = hours % 12;
    return ` ${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <div
        className={
          msg?.sender === curUser.id
            ? "msg-content msg-sender"
            : " msg-content msg-receiver" +
              (showTime ? " show-time msg-content-animate" : "")
        }
        onMouseEnter={() => setShowTime(true)}
        onMouseLeave={() => setShowTime(false)}
      >
        {msg?.sender === curUser.id && (
          <div
            className={showTime ? "msg-time show-msg-time" : "msg-time"}
            style={{ cursor: "default" }}
          >
            {formatTime(msg?.createdAt)}
          </div>
        )}
        <p
          className={
            msg?.sender === curUser.id ? "msg-text-sender" : "msg-text-receiver"
          }
        >
          {msg?.message}
        </p>
        {msg?.sender !== curUser.id && (
          <div
            className={showTime ? "msg-time show-msg-time" : "msg-time"}
            style={{ cursor: "default" }}
          >
            {formatTime(msg?.createdAt)}
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
