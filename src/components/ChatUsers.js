import React from "react";
import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import Loader from "./Loader";
import { userAuthed } from "../features/user/userSlice";
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
  const { data: contactsData, isSuccess } = useGetUserContactsApiQuery({
    userId: user.id,
  });

  const { data: followingData, isSuccess: FollowingSuccess } =
    useGetFollowingApiQuery({
      userId: user.id,
    });

  // const { data: userWithIdData } = useGetUserWithIdApiQuery({
  //   userId: user.id,
  // });

  useEffect(() => {
    if (isSuccess) {
      setContacts(followingData);
      setLoading(false);
    }
  }, [contactsData, isSuccess, FollowingSuccess]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {contacts?.map((contact) => (
            <ChatUser
              key={contact}
              chatUser={contact}
              setCurrentChat={setCurrentChat}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ChatUsers;
