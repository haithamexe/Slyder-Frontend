import { useGetUserSearchedApiQuery } from "../features/user/userApiSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../context/SocketContext";
import axios from "axios";

const UsersSearchChat = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const { newConversation } = useSocketContext();
  const [usersList, setUsers] = useState([]);
  const { data: users, isSuccess } = useGetUserSearchedApiQuery({
    query: query,
  });

  useEffect(() => {
    if (isSuccess) {
      setUsers(users);
    }
  }, [users, isSuccess]);

  const handleUserClick = (userId) => {
    newConversation(userId);
  };

  return (
    <>
      {usersList.length > 0 && (
        <div className="users-search-container-chat">
          {usersList?.map((user) => (
            <div
              key={user?._id}
              className="users-search"
              onClick={() => {
                handleUserClick(user?._id); //start a convo with this person
                setQuery("");
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="users-search-img">
                <img src={user?.picture} alt="user" />
              </div>
              <div className="users-search-info">
                <h1>
                  {user?.firstName} {user?.surName}
                </h1>
                <p>{user?.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersSearchChat;
