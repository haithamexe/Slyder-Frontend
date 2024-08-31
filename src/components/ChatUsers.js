import React from "react";
import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import Loader from "./Loader";
import { userAuthed } from "../features/user/userSlice";
import axios from "axios";
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
  const followingData = null;

  // const { data: followingData, isSuccess: FollowingSuccess } =
  //   useGetFollowingApiQuery({
  //     userId: user.id,
  //   });

  // useEffect(() => {
  //   if (FollowingSuccess && user) {
  //     setLoading(false);
  //     console.log(followingData, " loaded");
  //   }
  //   console.log(followingData);
  // }, [FollowingSuccess, user]);

  const fetchChats = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}api/message/conversations`,
        withCredentials: true,
      });

      if (res) {
        console.log(res.data);
        setContacts(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {followingData?.map((contact) => (
            <ChatUser
              key={contact}
              contact={contact}
              setCurrentChat={setCurrentChat}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ChatUsers;
