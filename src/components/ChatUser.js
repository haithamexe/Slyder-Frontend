import React from "react";
import { useGetConversationQuery } from "../features/message/messageApiSlice";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";

const ChatUser = ({ chatUser, setCurrentChat }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastMessage, setLastMessage] = useState(null);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [lastMessageTurnicated, setLastMessageContent] = useState(null);
  const { data: conversationData, isSuccess } = useGetConversationQuery({
    receiverId: chatUser,
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
    }
  }, [conversationData, isSuccess]);

  return (
    <div className="chat-user" onClick={() => setCurrentChat(conversation)}>
      <div className="chat-user-img">
        <img src={conversation?.user?.picture} alt="user" />
      </div>
      <div className="chat-user-info">
        <h1>
          {conversation?.user?.firstName + " " + conversation?.user?.surName}
        </h1>
        <p>
          {lastMessageTurnicated}
          <span>{lastMessageTime && formatTimeAgo(lastMessageTime)}</span>
        </p>
      </div>
    </div>
  );
};

export default ChatUser;
