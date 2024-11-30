import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChatUsers from "./ChatUsers";
import ChatWindow from "./ChatWindow";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import UsersSearchChat from "./UsersSearchChat";
import { useSocketContext } from "../context/SocketContext";

const ChatList = () => {
  const user = useSelector(userAuthed);
  const [currentChat, setCurrentChat] = useState("");
  const [addConvo, setAddConvo] = useState(false);
  const [query, setQuery] = useState("");
  const { activeConversation } = useSocketContext();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileMenu(window.innerWidth < 768);
    });

    if (window.innerWidth < 768) {
      setIsMobile(true);
    }

    return () => {
      window.removeEventListener("resize", () => {
        setMobileMenu(window.innerWidth < 768);
      });
    };
  }, []);

  return (
    <>
      <div className="chat-list">
        <div className="chat-mobile-menu">
          <MoreVertRoundedIcon
            sx={{
              fontSize: 30,
              color: "#a7c750;",
              cursor: "pointer",
            }}
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </div>
        {/* <div className="list">
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
            <ChatUsers setCurrentChat={setCurrentChat} />
          </div>
        </div> */}

        <div className="chat-section">
          {!activeConversation ? (
            <div className="chat-intro">
              <h1 className="chat-intro">
                Welcome {user?.firstName} {user?.surName} Select a conversation
                to start messaging
              </h1>
            </div>
          ) : (
            <ChatWindow activeConversation={activeConversation} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
