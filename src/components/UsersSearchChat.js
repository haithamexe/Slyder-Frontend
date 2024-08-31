import { useGetUserSearchedApiQuery } from "../features/user/userApiSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersSearchChat = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const [usersList, setUsers] = useState([]); // [new
  const { data: users, isSuccess } = useGetUserSearchedApiQuery({
    query: query,
  });

  useEffect(() => {
    if (isSuccess) {
      setUsers(users);
    }
  }, [users, isSuccess]);

  return (
    <>
      {usersList.length > 0 && (
        <div className="users-search-container-chat">
          {usersList?.map((user) => (
            <div
              key={user?._id}
              className="users-search"
              onClick={() => {
                setQuery("");
                //start a convo with this person
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
