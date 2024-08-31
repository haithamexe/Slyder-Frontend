import React from "react";
import { useGetConversationQuery } from "../features/message/messageApiSlice";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { clearMessages } from "../features/message/messageSlice";
import { useDispatch } from "react-redux";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { useSocketContext } from "../context/SocketContext";

const ChatUser = ({ contact, setCurrentChat }) => {
  const { onlineUsers } = useSocketContext();
  const dispatch = useDispatch();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastMessage, setLastMessage] = useState(null);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [lastMessageTurnicated, setLastMessageContent] = useState(null);
  const { data: conversationData, isSuccess } = useGetConversationQuery({
    receiverId: contact._id,
  });

  useEffect(() => {
    if (isSuccess) {
      setConversation(conversationData);
      setLastMessage(conversationData?.lastMessage);
      if (conversationData?.lastMessage?.message?.length >= 15) {
        setLastMessageContent(
          conversationData?.lastMessage?.message.substring(0, 13) + "..."
        );
      } else {
        setLastMessageContent(conversationData?.lastMessage?.message);
      }
      setLastMessageTime(conversationData?.lastMessage?.createdAt);
      setLoading(false);

      console.log("conversationData", conversationData);
      console.log("lastMessage", lastMessage);
    }
  }, [conversationData, isSuccess]);

  return (
    <div
      className="chat-user"
      onClick={() => {
        dispatch(clearMessages());

        setCurrentChat(conversation);
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
          sx={{ fontSize: 15, color: "grey" }}
        />
      )}
      <div className="chat-user-info">
        <h1>
          {conversation?.user?.firstName + " " + conversation?.user?.surName}
        </h1>
        <p>
          {lastMessageTurnicated}
          <span> {lastMessageTime && formatTimeAgo(lastMessageTime)}</span>
        </p>
      </div>
    </div>
  );
};

export default ChatUser;
