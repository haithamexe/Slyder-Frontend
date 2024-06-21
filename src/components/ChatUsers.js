import React from "react";
import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import Loader from "./Loader";
import { userAuthed } from "../features/user/userSlice";
import { useGetUserContactsApiQuery } from "../features/user/userApiSlice";
import { useSelector } from "react-redux";

const ChatUsers = ({ setCurrentChat }) => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(userAuthed);
  const { data: contactsData, isSuccess } = useGetUserContactsApiQuery({
    userId: user.id,
  });

  useEffect(() => {
    if (isSuccess) {
      setContacts(contactsData);
      setLoading(false);
    }
  }, [contactsData, isSuccess]);

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
