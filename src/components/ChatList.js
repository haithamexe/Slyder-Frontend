import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChatUsers from "./ChatUsers";
import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import UsersSearchChat from "./UsersSearchChat";

const ChatList = () => {
  const user = useSelector(userAuthed);
  const [currentChat, setCurrentChat] = useState("");
  const [addConvo, setAddConvo] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="chat-list">
        <div className="list">
          <div className="Messages-header">
            {addConvo ? (
              <input
                className="chat-search-bar"
                type="text"
                placeholder="Search for a user"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            ) : (
              <h1>Messages</h1>
            )}
            <AddCircleRoundedIcon
              className={addConvo ? "add-convo" : " "}
              sx={{
                fontSize: 30,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={() => {
                setQuery("");
                setAddConvo(!addConvo);
              }}
            />
            {query && <UsersSearchChat query={query} setQuery={setQuery} />}
          </div>
          <div className="chat-body">
            {/* <div className="chat-user">
              <div className="chat-user-img">
                <img src="/images/demo/3.png" alt="user" />
              </div>
              <div className="chat-user-info">
                <h1>John Doe</h1>
                <p>
                  hello didnt see at the office <span>1d</span>
                </p>
              </div>
            </div> */}
            <ChatUsers setCurrentChat={setCurrentChat} />
          </div>
        </div>
        <div className="chat-section">
          {!currentChat ? (
            <div className="chat-intro">
              <h1 className="chat-intro">
                Welcome {user?.firstName} {user?.surName} Select a conversation
                to start messaging
              </h1>
            </div>
          ) : (
            <ChatWindow currentChat={currentChat} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
