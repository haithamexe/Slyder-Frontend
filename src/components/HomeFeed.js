import { useRef, useState, useEffect } from "react";
import Slyders from "./Slyders";
import Post from "./Post";

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
import { useGetHomePostsQuery } from "../features/post/postApiSlice";
import { homePosts, postActions } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import PostPreveiw from "./PostPreveiw";
import { useParams } from "react-router-dom";

const HomeFeed = ({ setNewPost, user, redirectionPage }) => {
  const dispatch = useDispatch();
  const [postId, setFetchPostId] = useState("");
  const [posts, setPosts] = useState([]);
  const { postId: postInIdParam } = useParams();

  const {
    data: homePosts,
    isSuccess,
    refetch,
    status,
    error,
    isFetching,
    isUninitialized,
    isFetchingError,
  } = useGetHomePostsQuery(user?.id);

  const [feedScrollable, setFeedScrollable] = useState(false);
  const feedRef = useRef(null);

  const handleScrollEnter = () => {
    setFeedScrollable(true);
  };

  const handleScrollExit = () => {
    setFeedScrollable(false);
  };

  useEffect(() => {
    if (isSuccess || homePosts || user) {
      setPosts(homePosts);
    }
    if (postInIdParam) {
      setFetchPostId(postInIdParam);
      console.log("postInIdParam", postInIdParam);
    }
    console.log(homePosts);
  }, [isSuccess, homePosts, user, postInIdParam]);

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
          <div className="post-input-img-wrapper">
            <img src={user.picture} alt="post" />
          </div>
          <button
            type="button"
            className="post-new-button"
            onClick={() => setNewPost(true)}
          >
            What's on your mind?
          </button>
        </div>
      </div>

      <div
        className={feedScrollable ? "feed feed-scrollable" : "feed"}
        onMouseEnter={handleScrollEnter}
        onMouseLeave={handleScrollExit}
        ref={feedRef}
      >
        {posts?.map((post) => (
          <Post key={post} postId={post} setFetchPostId={setFetchPostId} />
        ))}
        {/* <Post /> */}
      </div>
      {postId && (
        <PostPreveiw
          postId={redirectionPage || postId}
          setFetchPostId={setFetchPostId}
          origin="feed"
        />
      )}
    </>
  );
};

export default HomeFeed;
