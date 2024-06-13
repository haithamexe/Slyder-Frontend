import "../styles/home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useGetHomePostsQuery } from "../features/post/postApiSlice";
import NewPost from "../components/NewPost";
import { postActions } from "../features/post/postSlice";
import { useDispatch } from "react-redux";
import { homePosts } from "../features/post/postSlice";
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import UserCol from "../components/UserCol";
import HomeFeed from "../components/HomeFeed";
import MsgCol from "../components/MsgCol";

const Home = () => {
  const user = useSelector(userAuthed);
  const [width, setWidth] = useState(window.innerWidth);
  const [newPost, setNewPost] = useState(false); // [new]
  const [postsLoading, setPostsLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector(homePosts);
  const [currentPosts, setCurrentPosts] = useState(null);
  const navigate = useNavigate();

  const handleResize = () => {
    setWidth(window.innerWidth);
    refreshPage();
  };

  const {
    data: fetchedHomePosts,
    isLoading,
    isSuccess,
    error,
    isError,
    refetch: refetchHomePosts,
  } = useGetHomePostsQuery(user.id);

  useEffect(() => {
    if (!posts || !fetchedHomePosts) {
      refetchHomePosts();
    }
    if (isSuccess && !posts) {
      setPostsLoading(false);
      dispatch(postActions.setHomePosts(fetchedHomePosts));
    }
    if (isLoading) {
      setPostsLoading(true);
    }
    setCurrentPosts(posts);
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSuccess, fetchedHomePosts, posts]);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <PanelGroup className="home" direction="horizontal">
        {width >= 1400 && (
          <>
            <Panel className="left" defaultSize={20} minSize={17}>
              <UserCol user={user} />
            </Panel>
            <div className="resize-column">
              <MoreVertRoundedIcon
                sx={{
                  fontSize: 27,
                  color: "#0d0e10",
                  padding: 0,
                  margin: 0,
                  // height: 30,
                  position: "absolute",
                  top: 350,
                  left: -12,
                  zIndex: -2,
                }}
              />
            </div>
            <PanelResizeHandle />
          </>
        )}

        <Panel className="center" defaultSize={35} minSize={35} maxSize={50}>
          <HomeFeed
            user={user}
            setNewPost={setNewPost}
            refetchHomePosts={refetchHomePosts}
          />
        </Panel>

        {width >= 900 && (
          <>
            <PanelResizeHandle />
            <div className="resize-column">
              <MoreVertRoundedIcon
                sx={{
                  fontSize: 27,
                  color: "#0d0e10",
                  padding: 0,
                  margin: 0,
                  // height: 30,
                  position: "absolute",
                  top: 350,
                  left: -12,
                  zIndex: -2,
                }}
              />
            </div>
            <Panel className="right" defaultSize={22} minSize={16}>
              <MsgCol
                Panel={Panel}
                PanelGroup={PanelGroup}
                PanelResizeHandle={PanelResizeHandle}
                user={user}
              />
            </Panel>
          </>
        )}
      </PanelGroup>

      <NewPost
        setNewPost={setNewPost}
        newPost={newPost}
        refetchHomePosts={refetchHomePosts}
      />
    </>
  );
};

export default Home;
