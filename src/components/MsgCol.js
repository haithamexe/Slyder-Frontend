import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import PostPreveiw from "./PostPreveiw";
import {
  useGetSavedPostsQuery,
  useGetLikedPostsQuery,
} from "../features/post/postApiSlice";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import CanvasInHom from "../components/CanvasInHom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const MsgCol = (props) => {
  const [postId, setFetchPostId] = useState("");
  const user = useSelector(userAuthed);
  const { data: savedPostsData, isSuccess } = useGetSavedPostsQuery({
    userId: user?.id,
  });

  const { data: likedPostsData, isSuccess: likedSuccess } =
    useGetLikedPostsQuery({
      userId: user?.id,
    });

  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const navigate = useNavigate();
  const { Panel, PanelGroup, PanelResizeHandle } = props;
  const [activityScrollable, setActivityScrollable] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
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

  useEffect(() => {
    if (savedPostsData) {
      const savedpostsrevresedOrder = [...savedPostsData].reverse();
      setSavedPosts(savedpostsrevresedOrder);
    }
    if (likedPostsData) {
      const likedpostsrevresedOrder = [...likedPostsData].reverse();
      setLikedPosts(likedpostsrevresedOrder);
    }

    // console.log(savedPostsData, isSuccess, "savedPostsData");
  }, [savedPostsData, likedPostsData]);

  useEffect(() => {
    document.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 650);
    });

    if (window.innerWidth < 650) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    return () => {
      document.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 650);
      });
    };
  }, []);

  return (
    <>
      <div className="home-activity">
        <div className="canvas-container-in-home">
          <CanvasInHom />
        </div>
      </div>

      <div className="quick-access">
        <div className="quick-access-header">
          <h1>Quick Access</h1>
        </div>
        <div className="quick-access-body">
          <div
            className="quick-access-card"
            onClick={() => {
              setShowSaved(true);
              setShowLiked(false);
            }}
          >
            <h1>Saved</h1>
            <TurnedInRoundIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            className="quick-access-card"
            onClick={() => {
              setShowLiked(true);
              setShowSaved(false);
            }}
          >
            <h1>Likes</h1>
            <FavoriteRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            className="quick-access-card"
            onClick={() => navigate("/trending")}
          >
            <h1>Notes</h1>
            <EditNoteRoundedIcon
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        {(showLiked || showSaved) && (
          <div className="more-container">
            <ArrowBackRoundedIcon
              className="saved-likes-back"
              sx={{
                fontSize: 35,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowLiked(false);
                setShowSaved(false);
              }}
            />
            {showSaved && (
              <div className="more-saved">
                {savedPosts
                  .filter((post) => post.image)
                  .map((post) => {
                    return (
                      <div className="more-saved-card">
                        <img
                          src={post.image}
                          alt="saved"
                          onClick={() => setFetchPostId(post?._id)}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
            {showLiked && (
              <div className="more-saved">
                {likedPosts
                  .filter((post) => post.image)
                  .map((post) => {
                    return (
                      <div className="more-saved-card">
                        <img
                          src={post.image}
                          alt="saved"
                          onClick={() => setFetchPostId(post?._id)}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
      {postId && (
        <PostPreveiw
          postId={postId}
          setFetchPostId={setFetchPostId}
          origin="feed"
        />
      )}
    </>
  );
};

export default MsgCol;
