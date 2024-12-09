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
      console.log(err);
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
        className={feedScrollable ? "feed feed-scrollable" : "feed"}
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

        {/* <div className="feed-post trending-post">
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
        </div> */}
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
