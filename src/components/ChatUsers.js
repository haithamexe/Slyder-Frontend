import React from "react";
import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import Loader from "./Loader";
import { userAuthed } from "../features/user/userSlice";
import axios from "axios";
import { useSocketContext } from "../context/SocketContext";
import {
  useGetUserContactsApiQuery,
  useGetFollowingApiQuery,
  useGetUserWithIdApiQuery,
} from "../features/user/userApiSlice";
import { useSelector } from "react-redux";

const ChatUsers = ({ setCurrentChat }) => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(userAuthed);
  const { conversations } = useSocketContext();

  useEffect(() => {
    if (conversations) {
      setLoading(false);
    }
  }, [conversations]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {conversations?.map((conversation, index) => (
            <ChatUser
              key={index}
              conversation={conversation}
              setCurrentChat={setCurrentChat}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ChatUsers;
