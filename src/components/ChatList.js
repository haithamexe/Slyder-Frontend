import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";
import ChatUsers from "./ChatUsers";
import ChatWindow from "./ChatWindow";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import UsersSearchChat from "./UsersSearchChat";
import { useSocketContext } from "../context/SocketContext";
import ChatAvatars from "./ChatAvatars";

const ChatList = () => {
  const user = useSelector(userAuthed);
  const [currentChat, setCurrentChat] = useState("");
  const [addConvo, setAddConvo] = useState(false);
  const [query, setQuery] = useState("");
  const { activeConversation } = useSocketContext();
  const [isMobile, setIsMobile] = useState(false);
  // const [mobileMenu, setMobileMenu] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 750);
      setShowMenu(window.innerWidth > 750);
    });

    if (window.innerWidth < 750) {
      setIsMobile(true);
      setShowMenu(false);
    } else {
      setIsMobile(false);
      setShowMenu(true);
    }

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 750);
        setShowMenu(window.innerWidth > 750);
      });
    };
  }, [activeConversation]);

  return (
    <>
      <div className="chat-list">
        <>
          <div
            className={
              isMobile && !showMenu
                ? "chat-mobile-menu show-chat-menu"
                : "chat-mobile-menu"
            }
          >
            <div className="chat-mobile-menu-icon-toggle">
              <ArrowDropDownCircleRoundedIcon
                sx={{
                  fontSize: 30,
                  color: "#a7c750;",
                  cursor: "pointer",
                  rotate: 270 + "deg",
                }}
                onClick={() => setShowMenu(true)}
              />
            </div>
            <div className="chat-mobile-menu-list">
              <ChatAvatars />
            </div>
          </div>
        </>
        {/* {showMenu && ( */}
        <div className={showMenu ? "list" : "list hide-chat-list"}>
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
            {isMobile && showMenu && (
              <ArrowDropDownCircleRoundedIcon
                sx={{
                  fontSize: 30,
                  color: "#a7c750;",
                  cursor: "pointer",
                  rotate: 90 + "deg",
                }}
                onClick={() => setShowMenu(false)}
              />
            )}
            {query && <UsersSearchChat query={query} setQuery={setQuery} />}
          </div>
          <div className="chat-body">
            <ChatUsers setCurrentChat={setCurrentChat} />
          </div>
        </div>
        {/* )} */}

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
