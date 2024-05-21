// import { useSelector } from "react-redux";
// import { postsAuthed } from "../redux/selectors";
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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";

import { useGetUserWithIdApiQuery } from "../features/user/userApiSlice";
import { useDeletePostMutation } from "../features/post/postApiSlice";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
// import { formatDistanceToNow } from "date-fns";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { postActions } from "../features/post/postSlice";

const Post = ({ post, setFetchPostId, refetchPosts, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  const currentUser = useSelector(userAuthed);
  const [user, setUser] = useState(null);
  const {
    data: userData,
    isSuccess: isUserSuccess,
    refetch: refetchUser,
  } = useGetUserWithIdApiQuery(post.user);

  const [
    deletePost,
    { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading },
  ] = useDeletePostMutation();
  // const posts = useSelector(postsAuthed);
  const menuRef = useRef();
  const [following, setFollowing] = useState([]);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setDropDownMenu(false);
    }
  };

  const handleDeletePost = () => {
    console.log("delete");
    deletePost(post._id);
  };

  useEffect(() => {
    // refetch();
    console.log(post);
    // document.addEventListener("mousedown", handleClickOutside);
    if (currentUser.id === post.user && !user) {
      setIsAuther(true);
      setUser(currentUser);
    } else if (!user && isUserSuccess) {
      setUser(userData);
      setIsAuther(false);
    } else if (!isUserSuccess) {
      refetchUser();
    }
    if (isDeleteSuccess) {
      dispatch(postActions.deletePost(post._id));
      if (type === "profile") {
        refetchPosts();
      }
      // setFetchPostId(null);
    }
    setFollowing(user?.following);
    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userData, post, currentUser, user, isUserSuccess]);

  return (
    <>
      <div className="feed-post">
        <div className="feed-post-header">
          <div className="feed-post-header-img">
            <img src={userData?.picture} alt="post" />
          </div>
          <div className="feed-post-header-info">
            <div className="feed-post-header-info-name">
              <h1 onClick={() => navigate("/" + userData?.username)}>
                {userData?.firstName + " " + userData?.surName}
              </h1>
              <p title={post?.createdAt}>{formatTimeAgo(post?.createdAt)}</p>
            </div>
            {/* <button className="post-follow">Unfollow</button> */}
            <MoreVertRoundedIcon
              ref={menuRef}
              onClick={() => setDropDownMenu(!dropDownMenu)}
              className="post-on-options"
              sx={{
                fontSize: 24,
                color: "#a7c750;",
                cursor: "pointer",
                width: "27px",
                height: "27px",
              }}
            />
            <div className="post-menu-options-container">
              {dropDownMenu && (
                <div className="post-menu-options">
                  <div className="post-menu-option">
                    <InsertLinkRoundedIcon
                      sx={{
                        fontSize: 27,
                        color: "#a7c750;",
                        cursor: "pointer",
                      }}
                    />
                    <p>Copy Link</p>
                  </div>
                  {!isAuther && (
                    <>
                      {following?.includes(post.user) && (
                        <div className="post-menu-option">
                          <PersonRemoveRoundedIcon
                            sx={{
                              fontSize: 27,
                              color: "#a7c750;",
                              cursor: "pointer",
                            }}
                          />
                          <p>Unfolllow</p>
                        </div>
                      )}
                      {/* <div className="post-menu-option">
                        <PersonAddAltRoundedIcon
                          sx={{
                            fontSize: 27,
                            color: "#a7c750;",
                            cursor: "pointer",
                          }}
                        />
                        <p>Folllow</p>
                      </div> */}
                    </>
                  )}
                  {isAuther && (
                    <>
                      <div className="post-menu-option">
                        <EditRoundedIcon
                          sx={{
                            fontSize: 27,
                            color: "#a7c750;",
                            cursor: "pointer",
                          }}
                        />
                        <p>Edit</p>
                      </div>
                      <div
                        className="post-menu-option"
                        onClick={handleDeletePost}
                      >
                        <DeleteForeverRoundedIcon
                          sx={{
                            fontSize: 27,
                            color: "#a7c750;",
                            cursor: "pointer",
                          }}
                        />
                        <p>Delete</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="feed-post-body">
          <p>{post?.content}</p>
        </div>
        {post?.image && (
          <div className="feed-post-img">
            <img
              src={post?.image}
              alt="post"
              onClick={() => {
                setFetchPostId(post._id);
              }}
            />
          </div>
        )}
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
          <img src={userData?.picture} alt="post" />
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
    </>
  );
};

export default Post;
