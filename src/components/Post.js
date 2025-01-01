import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import Loader from "./Loader";
import { useGetUserWithIdApiQuery } from "../features/user/userApiSlice";
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetPostLikesQuery,
  useGetPostCommentsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useGetPostSavedQuery,
  useSavePostMutation,
  useUnsavePostMutation,
  useGetPostQuery,
} from "../features/post/postApiSlice";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../utils/formatTimeAgo";

const Post = ({ postId, setFetchPostId, stateChanged, setFetchedPost }) => {
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [commentPost] = useCommentPostMutation();
  const [savePost] = useSavePostMutation();
  const [unsavePost] = useUnsavePostMutation();
  const { data: fetchedPost } = useGetPostQuery(postId);

  const [isSaved, setIsSaved] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [onFlyComment, setOnFlyComment] = useState("");
  const [postIsLoading, setPostIsLoading] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const currentUser = useSelector(userAuthed);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setDropDownMenu(false);
    }
  };

  const handleDeletePost = () => {
    deletePost(fetchedPost._id);
    setDropDownMenu(false);
  };

  const handleCommentPost = () => {
    if (onFlyComment || !onFlyComment === "") {
      commentPost({
        postId: fetchedPost._id,
        userId: currentUser.id,
        comment: onFlyComment,
      });
      setOnFlyComment("");
    }
  };

  const handleSavePost = () => {
    savePost({ postId: fetchedPost._id, userId: currentUser.id });
  };

  const handleUnsavePost = () => {
    unsavePost({ postId: fetchedPost._id, userId: currentUser.id });
  };

  const handleReaction = () => {
    if (isLiked) {
      unlikePost({ postId: fetchedPost._id, userId: currentUser.id });
      setIsLiked(false);
    } else {
      likePost({ postId: fetchedPost._id, userId: currentUser.id });
      // setIsLiked(true);
    }
  };

  const handleSaveState = () => {
    if (isSaved) {
      unsavePost({ postId: fetchedPost._id, userId: currentUser.id });
      setIsSaved(false);
    } else {
      savePost({ postId: fetchedPost._id, userId: currentUser.id });
      setIsSaved(true);
    }
  };

  useEffect(() => {
    if (fetchedPost) {
      setPostIsLoading(false);
      if (fetchedPost?.user?._id === currentUser.id) {
        setIsAuther(true);
      }
      fetchedPost?.likes?.forEach((like) => {
        if (like.user === currentUser.id) {
          setIsLiked(true);
          return;
        }
      });

      fetchedPost?.savedBy?.forEach((saved) => {
        if (saved.user === currentUser.id) {
          setIsSaved(true);
          return;
        }
      });

      if (fetchedPost?.likes?.length === 0) {
        setIsLiked(false);
      }

      if (fetchedPost?.savedBy?.length === 0) {
        setIsSaved(false);
      }
    }
  }, [fetchedPost, postId]);

  const content = (
    <>
      <div className="feed-post">
        <div className="feed-post-header">
          <div className="feed-post-header-img">
            <img
              src={fetchedPost?.user?.picture}
              alt="post"
              onClick={() => navigate("/" + fetchedPost?.user?.username)}
            />
          </div>
          <div className="feed-post-header-info">
            <div className="feed-post-header-info-name">
              <h1 onClick={() => navigate("/" + fetchedPost?.user?.username)}>
                {fetchedPost?.user?.firstName +
                  " " +
                  fetchedPost?.user?.surName}
              </h1>
              {fetchedPost && (
                <p title={fetchedPost?.createdAt}>
                  {formatTimeAgo(fetchedPost?.createdAt)}
                </p>
              )}
            </div>
            {/* <button className="post-follow">Unfollow</button> */}
            {isAuther && (
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
            )}
            <div className="post-menu-options-container">
              {dropDownMenu && isAuther && (
                <div className="post-menu-options" ref={menuRef}>
                  <>
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
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="feed-post-body">
          <p>{fetchedPost?.content}</p>
        </div>
        {fetchedPost?.image && (
          <div className="feed-post-img">
            <img
              src={fetchedPost?.image}
              alt="post"
              onClick={() => {
                setFetchPostId(fetchedPost._id);
                setFetchedPost(fetchedPost);
              }}
            />
          </div>
        )}
        <div className="feed-post-footer">
          <div className="post-icon-with-numbers">
            {/* <h1
              style={{
                color: isLiked ? "#a7c750" : "black",
                cursor: "pointer",
              }}
              onClick={handleReaction}
            >
              {isLiked ? "Unlike" : "Like"}
            </h1> */}
            {isLiked ? (
              <FavoriteRoundedIcon
                onClick={handleReaction}
                className={
                  isLiked ? "post-like-new post-like-animate" : "post-like-new "
                }
                sx={{
                  fontSize: 27,
                  color: "#b51d24",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                onClick={handleReaction}
                className={
                  isLiked ? "post-like-new post-like-animate" : "post-like-new "
                }
                sx={{
                  fontSize: 27,
                  color: "#a7c750",
                  cursor: "pointer",
                }}
              />
            )}
            <p className="post-like-text-icon">
              {fetchedPost?.likes?.length || 0}
            </p>
          </div>
          <div className="post-icon-with-numbers">
            {!isCommenting ? (
              <ChatBubbleOutlineRoundedIcon
                onClick={() => setIsCommenting(true)}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
            ) : (
              <ChatRoundedIcon
                onClick={() => {
                  setOnFlyComment("");
                  setIsCommenting(false);
                }}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
            )}
            <p>{fetchedPost?.comments?.length}</p>
          </div>
          {isSaved ? (
            <BookmarkRoundedIcon
              className="post-save"
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={handleSaveState}
            />
          ) : (
            <TurnedInNotRoundedIcon
              className="post-save"
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={handleSaveState}
            />
          )}
        </div>
        {isCommenting && (
          <div className="feed-post-comments">
            <img src={currentUser?.picture} alt="post" />
            <input
              type="text"
              placeholder="Write a comment"
              value={onFlyComment}
              onChange={(e) => setOnFlyComment(e.target.value)}
            />
            <SendRoundedIcon
              className="comment-send-icon"
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={() => {
                handleCommentPost();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
  return <>{!fetchedPost ? null : content}</>;
};

export default Post;
