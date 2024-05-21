import { useEffect } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ChatList = () => {
  return (
    <>
      <div className="chat-list">
        <div className="list">
          <div className="Messages-header">
            <h1>Messages</h1>
            <MoreVertRoundedIcon
              sx={{
                fontSize: 30,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="chat-body">
            <div className="chat-user">
              <div className="chat-user-img">
                <img src="/images/demo/3.png" alt="user" />
              </div>
              <div className="chat-user-info">
                <h1>John Doe</h1>
                <p>
                  hello didnt see at the office <span>1d</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-section"></div>
      </div>
    </>
  );
};

export default ChatList;
