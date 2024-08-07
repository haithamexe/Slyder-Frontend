import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

import { useGetUserWithIdApiQuery } from "../features/user/userApiSlice";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useUncommentPostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useGetPostQuery,
} from "../features/post/postApiSlice";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import CommentsList from "./CommentsList";

const PostPreveiw = ({ postId, setFetchPostId, origin, originUsername }) => {
  const navigate = useNavigate();
  const [isAuther, setIsAuther] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const previewRef = useRef();
  const currentUser = useSelector(userAuthed);
  const [onFlyComment, setOnFlyComment] = useState("");
  const [pageRootUrl, setPageRootUrl] = useState(window.location.pathname);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const imageRef = useRef(null);
  const [
    likePost,
    { data: likeData, error: likeError, isLoading: likeLoading },
  ] = useLikePostMutation();
  const [
    unlikePost,
    { data: unlikeData, error: unlikeError, isLoading: unlikeLoading },
  ] = useUnlikePostMutation();
  const [commentPost, { data: commentData, error: commentError }] =
    useCommentPostMutation();
  const [uncommentPost, { data: uncommentData, error: uncommentError }] =
    useUncommentPostMutation();

  const [savePost, { data: saveData, error: saveError }] =
    useSavePostMutation();
  const [unsavePost, { data: unsaveData, error: unsaveError }] =
    useUnsavePostMutation();

  const { data: post } = useGetPostQuery(postId);

  const handleReaction = () => {
    if (isLiked) {
      unlikePost({ postId: post._id, userId: currentUser.id });
      setIsLiked(false);
    } else {
      likePost({ postId: post._id, userId: currentUser.id });
      // setIsLiked(true);
    }
  };

  const handleSaveState = () => {
    if (isSaved) {
      unsavePost({ postId: post._id, userId: currentUser.id });
      setIsSaved(false);
    } else {
      savePost({ postId: post._id, userId: currentUser.id });
    }
  };

  const handleCommentPost = () => {
    if (!onFlyComment) return;
    commentPost({
      postId: post?._id,
      comment: onFlyComment,
      userId: currentUser?.id,
    });
    setOnFlyComment("");
  };

  const handleUncommentPost = (commentId) => {
    uncommentPost({ commentId });
  };

  const handleSavePost = () => {
    savePost({ postId: post?._id, userId: currentUser?.id });
  };

  const handleUnsavePost = () => {
    unsavePost({ postId: post?._id, userId: currentUser?.id });
  };

  const handleClickOutside = (e) => {
    if (previewRef.current && !previewRef.current.contains(e.target)) {
      if (pageRootUrl.includes("/feed")) {
        window.history.pushState(null, "", "/");
        setFetchPostId("");
      } else if (pageRootUrl.includes("/trending")) {
        window.history.pushState(null, "", "/trending");
        setFetchPostId("");
      } else if (pageRootUrl.includes("/profile")) {
        window.history.pushState(null, "", `/${originUsername}`);
        setFetchPostId("");
      } else {
        window.history.pushState(null, "", `${pageRootUrl}`);
        setFetchPostId("");
      }
      // else {
      //   window.history.pushState(null, "", `${pageRootUrl}`);
      //   setFetchPostId("");
      // }
    }
  };

  const closePostPreveiw = () => {
    if (pageRootUrl.includes("/feed")) {
      window.history.pushState(null, "", "/");
      setFetchPostId("");
    } else if (pageRootUrl.includes("/trending")) {
      window.history.pushState(null, "", "/trending");
      setFetchPostId("");
    } else if (pageRootUrl.includes("/profile")) {
      window.history.pushState(null, "", `/${originUsername}`);
      setFetchPostId("");
    } else {
      window.history.pushState(null, "", `${pageRootUrl}`);
      setFetchPostId("");
    }
  };

  useEffect(() => {
    console.log(postId, "postId");
    document.addEventListener("mousedown", handleClickOutside);
    window.history.pushState(
      null,
      "",
      `/post/${postId}/${origin}/${originUsername}`
    );
    setPageRootUrl(window.location.pathname);

    if (post) {
      post?.likes?.map((like) => {
        if (like?.user === currentUser?.id) {
          setIsLiked(true);
          return;
        } else {
          setIsLiked(false);
        }
      });

      post?.savedBy?.map((save) => {
        if (save?.user === currentUser?.id) {
          setIsSaved(true);
          return;
        } else {
          setIsSaved(false);
        }
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [post, postId]);

  console.log(post);
  return (
    <div className="post-preveiw-container">
      <div className="post-preveiw-inside-container" ref={previewRef}>
        <CloseRounded
          className="post-preveiw-close-icon"
          sx={{
            fontSize: 27,
            color: "#a7c750;",
            cursor: "pointer",
          }}
          onClick={closePostPreveiw}
        />
        {post?.image && (
          <div
            className="post-preveiw-img-container"
            style={
              imageRef.current?.width >= imageRef.current?.height
                ? { width: imageRef.current?.width }
                : {}
            }
          >
            <img src={post?.image} alt="post" ref={imageRef} />
          </div>
        )}
        <div className="post-preveiw-info-container">
          <div className="post-preveiw-user-info">
            <div className="post-preveiw-user-img">
              <img
                src={post?.user?.picture}
                alt="user"
                onClick={(e) => {
                  setFetchPostId("");
                  navigate("/" + post?.user?.username);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="post-preveiw-user-name">
              <h1
                onClick={() => {
                  setFetchPostId("");
                  navigate("/" + post?.user?.username);
                }}
                style={{ cursor: "pointer" }}
              >
                {post?.user?.firstName + " " + post?.user?.surName}
              </h1>
              <p title={post?.createdAt}>
                {post?.createdAt && formatTimeAgo(post?.createdAt)}
              </p>
            </div>
          </div>
          {post?.content && (
            <div className="post-preveiw-post-content">
              <h2>{post?.content}</h2>
            </div>
          )}
          <div className="post-preveiw-comments-container">
            <CommentsList
              postId={post?._id}
              setCommentsCount={setCommentsCount}
              setFetchPostId={setFetchPostId}
            />
          </div>
          <div className="post-preveiw-post-footer">
            <div className="post-preveiw-post-footer-icons">
              <div className="post-icon-with-numbers">
                {isLiked ? (
                  <FavoriteRoundedIcon
                    onClick={handleReaction}
                    className={
                      isLiked
                        ? "post-like-new post-like-animate"
                        : "post-like-new "
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
                      isLiked
                        ? "post-like-new post-like-animate"
                        : "post-like-new "
                    }
                    sx={{
                      fontSize: 27,
                      color: "#a7c750",
                      cursor: "pointer",
                    }}
                  />
                )}
                <p className="post-like-text-icon">
                  {post?.likes?.length || 0}
                </p>
              </div>
              <div className="post-preveiw-post-footer-icons-comments">
                <ChatBubbleOutlineRoundedIcon
                  onClick={() => console.log("comment")}
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                />
                <p className="post-like-text-icon">{commentsCount || 0}</p>
              </div>

              {isSaved ? (
                <BookmarkRoundedIcon
                  className="post-save-veiw"
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  onClick={handleSaveState}
                />
              ) : (
                <TurnedInNotRoundedIcon
                  className="post-save-veiw"
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  onClick={handleSaveState}
                />
              )}
            </div>
            <div className="post-preveiw-post-footer-comment">
              <img src={currentUser?.picture} alt="user" />
              <input
                type="text"
                placeholder="Write a comment"
                value={onFlyComment}
                onChange={(e) => setOnFlyComment(e.target.value)}
              />
              <SendRoundedIcon
                className="comment-send-icon-veiw"
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
                onClick={handleCommentPost}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreveiw;
