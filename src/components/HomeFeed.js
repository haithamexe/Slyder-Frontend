import { useRef, useState, useEffect } from "react";
import Slyders from "./Slyders";

import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";

const HomeFeed = () => {
  const [newPostText, setNewPostText] = useState("");
  const [feedScrollable, setFeedScrollable] = useState(false);
  const feedRef = useRef(null);

  const handleScrollEnter = () => {
    setFeedScrollable(true);
  };

  const handleScrollExit = () => {
    setFeedScrollable(false);
  };

  const handleScroll = () => {
    //very cool code for checking if the user has scrolled to the bottom of the feed
    // const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
    // const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    // setScrolledAmount(scrollPercentage);
  };

  return (
    <>
      <div className="post">
        <div className="post-input-img">
          <img src="/images/demo/3.png" alt="post" />
          <button type="button" className="post-new-button">
            What's on your mind?
          </button>
          {/* <input
            type="text"
            placeholder="What's on your mind?"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          /> */}
          {/* <SendRoundedIcon
            className="post-send-icon"
            sx={{
              fontSize: 30,
              color: "#a7c750;",
              cursor: "pointer",
            }}
          /> */}
        </div>
        {/* <div className="post-options">
          <button className="post-option">
            <PhotoLibraryRoundedIcon
              sx={{
                fontSize: 20,
                color: "#a7c750;",
              }}
            />
            <h1>Photo</h1>
          </button>
          <button className="post-option">
            <VideoLibraryRoundedIcon
              sx={{
                fontSize: 20,
                color: "#a7c750;",
              }}
            />

            <h1>Video</h1>
          </button>
          <button className="post-option">
            <PollRoundedIcon
              sx={{
                fontSize: 20,
                color: "#a7c750;",
              }}
            />
            <h1>Poll</h1>
          </button>
          <button className="post-option">
            <LibraryMusicRoundedIcon
              sx={{
                fontSize: 20,
                color: "#a7c750;",
              }}
            />
            <h1>Music</h1>
          </button>
          <button className="post-option">
            <MoreVertRoundedIcon
              sx={{
                fontSize: 20,
                color: "#a7c750;",
              }}
            />
            <h1>More</h1>
          </button>
        </div> */}
      </div>

      <div
        className={feedScrollable ? "feed feed-scrollable" : "feed"}
        onMouseEnter={handleScrollEnter}
        onMouseLeave={handleScrollExit}
        ref={feedRef}
      >
        <div className="feed-post">
          <div className="feed-post-header">
            <div className="feed-post-header-img">
              <img src="/images/demo/user1.png" alt="post" />
            </div>
            <div className="feed-post-header-info">
              <div className="feed-post-header-info-name">
                <h1>John Doe</h1>
                <p>@time</p>
              </div>
              <button className="post-follow">Unfollow</button>
              <MoreVertRoundedIcon
                onClick={() => console.log("options")}
                className="post-on-options"
                sx={{
                  fontSize: 24,
                  color: "#a7c750;",
                  cursor: "pointer",
                  width: "27px",
                  height: "27px",
                }}
              />
            </div>
          </div>
          <div className="feed-post-body">
            <p>
              Hello this is my firas d as dhgauhghujg asdg as jhg asd g ajsgd j
              kashd ahskd hk hakshdk h askjd h akjsdh hkjkjashd h kjahsk dhkahsd
              h dkhakdh ajhdkahkaak hsajdhakh kasdakjh haksd kh haksjdh k lkasdj
              lkjst post here hehe jeje hoho pew pew ....... . . . pew pew
            </p>
          </div>
          <div className="feed-post-img">
            <img src="/images/demo/post.jpg" alt="post" />
          </div>
          <div className="feed-post-footer">
            <FavoriteRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
            <ChatRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
            <ShortcutRoundIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
            <TurnedInRoundIcon
              className="post-save"
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="feed-post-comments">
            <img src="/images/demo/3.png" alt="post" />
            <input type="text" placeholder="Write a comment" />
            <SendRoundedIcon
              className="comment-send-icon"
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

export default HomeFeed;
