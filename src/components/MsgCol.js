import { useState } from "react";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
const MsgCol = (props) => {
  const { Panel, PanelGroup, PanelResizeHandle } = props;
  const [activityScrollable, setActivityScrollable] = useState(false);

  const [messagesScrollable, setMessagesScrollable] = useState(false);
  const handleActivtyScrollEnter = () => {
    setActivityScrollable(true);
  };

  const handleActivtyScrollExit = () => {
    setActivityScrollable(false);
  };

  const handleMessagesScrollEnter = () => {
    setMessagesScrollable(true);
  };

  const handleMessagesScrollExit = () => {
    setMessagesScrollable(false);
  };
  return (
    <>
      <div className="home-activity">
        <div className="activity-header">
          <h1>Activity</h1>
          <button>notif</button>
        </div>
        <div
          className={
            activityScrollable
              ? "activity-body-container activity-scrollable"
              : "activity-body-container"
          }
          onMouseEnter={handleActivtyScrollEnter}
          onMouseLeave={handleActivtyScrollExit}
        >
          <div className="activity-card">
            <div className="activity-card-img">
              <img src="/images/demo/user1.png" alt="activity" />
            </div>
            <div className="activity-card-info">
              <h1>John Doe</h1>
              <p>followed you</p>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-card-img">
              <img src="/images/demo/user3.jpg" alt="activity" />
            </div>
            <div className="activity-card-info">
              <h1>John Doe</h1>
              <p>followed you</p>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-card-img">
              <img src="/images/slyder-logo-star.png" alt="activity" />
            </div>
            <div className="activity-card-info">
              <h1>John Doe</h1>
              <p>followed you</p>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-card-img">
              <img src="/images/slyder-logo-star.png" alt="activity" />
            </div>
            <div className="activity-card-info">
              <h1>John Doe</h1>
              <p>followed you</p>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-card-img">
              <img src="/images/slyder-logo-star.png" alt="activity" />
            </div>
            <div className="activity-card-info">
              <h1>John Doe</h1>
              <p>followed you</p>
            </div>
          </div>
        </div>
        <div className="activity-footer">
          <button>See All</button>
        </div>
      </div>
      {/* <div className="home-messages">
        <div className="messages-header">
          <h1>Messages</h1>
          <button>notif</button>
        </div>
        <div
          className={
            messagesScrollable
              ? "messages-body-container messages-scrollable "
              : "messages-body-container"
          }
          onMouseEnter={handleMessagesScrollEnter}
          onMouseLeave={handleMessagesScrollExit}
        >
          <div className="message-card">
            <div className="message-card-img">
              <img src="/images/demo/user4.jpg" alt="message" />
            </div>
            <div className="message-card-info">
              <h1>John Doe</h1>
              <p>hello its been a while, how are you </p>
            </div>
          </div>
          <div className="message-card">
            <div className="message-card-img">
              <img src="/images/demo/user5.jpg" alt="message" />
            </div>
            <div className="message-card-info">
              <h1>John Doe</h1>
              <p>followed you kausd blaah blah</p>
            </div>
          </div>
          <div className="message-card">
            <div className="message-card-img">
              <img src="/images/demo/placeholder.jpg" alt="message" />
            </div>
            <div className="message-card-info">
              <h1>John Doe</h1>
              <p>kjalshd , asiod9w pos asdqj </p>
            </div>
          </div>
          <div className="message-card">
            <div className="message-card-img">
              <img src="/images/slyder-logo-star.png" alt="message" />
            </div>
            <div className="message-card-info">
              <h1>John Doe</h1>
              <p>followed you since march heha </p>
            </div>
          </div>
          <div className="message-card">
            <div className="message-card-img">
              <img src="/images/slyder-logo-star.png" alt="message" />
            </div>
            <div className="message-card-info">
              <h1>John Doe</h1>
              <p> pewp ewpwp sasd asd</p>
            </div>
          </div>
        </div>
        <div className="messages-footer">
          <button>See All</button>
        </div>
      </div> */}

      <div className="quick-access">
        <div className="quick-access-header">
          <h1>Quick Access</h1>
        </div>
        <div className="quick-access-body">
          <div className="quick-access-card">
            <h1>Saved</h1>
            <TurnedInRoundIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="quick-access-card">
            <h1>Likes</h1>
            <FavoriteRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="quick-access-card">
            <h1>Notes</h1>
            <EditNoteRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="quick-access-card">
            <h1>Report A Problem</h1>
            <ErrorOutlineRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MsgCol;
