import { useEffect, useState, useRef } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import Post from "./Post";
import { useGetTrendPostsQuery } from "../features/post/postApiSlice";
import PostPreveiw from "./PostPreveiw";
import axios from "axios";

const TrendingList = ({ postId }) => {
  const [curPostId, setFetchPostId] = useState(postId || ""); // [new
  const pageRef = useRef(0);
  const [postIds, setPostIds] = useState([]); // [new
  // const { data: posts, isSuccess } = useGetTrendPostsQuery();
  const [feedScrollable, setFeedScrollable] = useState(false);
  const [fetchedPost, setFetchedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const hasMorePostsRef = useRef(true);
  const feedRef = useRef(null);

  const handleScrollEnter = () => {
    setFeedScrollable(true);
  };

  const handleScrollExit = () => {
    setFeedScrollable(false);
  };

  const handleScroll = () => {
    if (
      feedRef.current.scrollTop + feedRef.current.clientHeight >=
      feedRef.current.scrollHeight
    ) {
      refetchPosts();
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "api/post/trend/" + pageRef.current
      );
      if (res.data.length > 0) {
        if (pageRef.current === 0) {
          setPosts(res.data);
        } else {
          setPosts((prev) => {
            return [...prev, ...res.data];
          });
        }
      } else {
        hasMorePostsRef.current = false;
      }
    } catch (err) {
      hasMorePostsRef.current = false;
    }
  };

  const refetchPosts = () => {
    if (hasMorePostsRef.current) {
      pageRef.current += 1;
      fetchPosts();
    }
  };

  useEffect(() => {
    if (posts?.length === 0) {
      fetchPosts();
    }

    const feedElement = feedRef.current;
    if (!feedElement) return;

    feedElement.addEventListener("scroll", handleScroll);

    return () => {
      feedElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (postId) {
      setFetchPostId(postId);
    }
    window.history.replaceState(null, "", "/trending");
  }, [posts, postId]);

  return (
    <div className="trending-list">
      <div
        ref={feedRef}
        className={
          window.innerWidth < 900 || feedScrollable
            ? "feed feed-scrollable"
            : "feed"
        }
        onMouseEnter={handleScrollEnter}
        onMouseLeave={handleScrollExit}
      >
        {posts.map((postId) => (
          <Post
            key={postId}
            postId={postId}
            setFetchPostId={setFetchPostId}
            setFetchedPost={setFetchedPost}
          />
        ))}
      </div>
      {curPostId && (
        <PostPreveiw
          postId={curPostId}
          setFetchPostId={setFetchPostId}
          origin="trending"
          post={fetchedPost}
          setFetchedPost={setFetchedPost}
        />
      )}
    </div>
  );
};

export default TrendingList;
