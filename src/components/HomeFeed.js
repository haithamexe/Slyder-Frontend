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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  useGetHomePostsQuery,
  useGetPostsQuery,
} from "../features/post/postApiSlice";
import { homePosts, postActions } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import PostPreveiw from "./PostPreveiw";
import { useParams } from "react-router-dom";
import { userAuthed } from "../features/user/userSlice";

const HomeFeed = ({ setNewPost, user, redirectionPage }) => {
  const dispatch = useDispatch();
  const [postId, setFetchPostId] = useState("");
  const [fetchedPost, setFetchedPost] = useState("");
  const [posts, setPosts] = useState([]);
  const { postId: postInIdParam } = useParams();
  const [stateChanged, setStateChanged] = useState(false);
  const userAuth = useSelector(userAuthed);

  // const {
  //   data: homePosts,
  //   isSuccess,
  //   refetch,
  //   status,
  //   error,
  //   isFetching,
  //   isUninitialized,
  //   isFetchingError,
  // } = useGetHomePostsQuery(user?.id);

  const { data: postsData } = useGetPostsQuery();

  const [feedScrollable, setFeedScrollable] = useState(false);
  const feedRef = useRef(null);

  const handleScrollEnter = () => {
    setFeedScrollable(true);
  };

  const handleScrollExit = () => {
    setFeedScrollable(false);
  };

  useEffect(() => {
    if (postInIdParam) {
      setFetchPostId(postInIdParam);
      // console.log("postInIdParam", postInIdParam);
    } else {
      setFetchPostId(redirectionPage);
    }
    // console.log(homePosts);
  }, [homePosts, user, postInIdParam]);

  useEffect(() => {
    if (postId) {
      setStateChanged(!stateChanged);
    }
  }, [postId]);

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
          {/* <div className="post-input-img-wrapper">
            <img src={user?.picture} alt="post" />
          </div> */}
          <button
            type="button"
            className="post-new-button"
            onClick={() => setNewPost(true)}
          >
            What's on your mind?
            <AddRoundedIcon
              className="post-new-button-icon-newPost-icon"
              style={{ color: "#a7c750", fontSize: "2rem" }}
            />
          </button>
        </div>
      </div>

      {postsData?.length > 0 ? (
        <div
          className={
            window.innerWidth < 1200 || feedScrollable
              ? "feed feed-scrollable"
              : "feed"
          }
          onMouseEnter={handleScrollEnter}
          onMouseLeave={handleScrollExit}
          ref={feedRef}
        >
          {postsData?.map((post) => (
            <Post
              key={post}
              postId={post}
              setFetchPostId={setFetchPostId}
              stateChanged={stateChanged}
              setFetchedPost={setFetchedPost}
            />
          ))}
        </div>
      ) : (
        <div className="home-no-posts">
          <h1>No posts</h1>
        </div>
      )}
      {postId && (
        <PostPreveiw
          postId={postId}
          setFetchPostId={setFetchPostId}
          setFetchedPost={setFetchedPost}
          origin="feed"
          fetchedPost={fetchedPost}
        />
      )}
    </>
  );
};

export default HomeFeed;
