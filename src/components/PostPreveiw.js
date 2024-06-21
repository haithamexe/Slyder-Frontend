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
  useGetPostByIdQuery,
  useGetPostLikesQuery,
  useGetPostCommentsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useUncommentPostMutation,
  useGetPostSavedQuery,
  useSavePostMutation,
  useUnsavePostMutation,
} from "../features/post/postApiSlice";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import CommentsList from "./CommentsList";

const PostPreveiw = ({ postId, setFetchPostId, origin, originUsername }) => {
  const {
    data: postData,
    isSuccess: postSuccess,
    refetch: refetchPost,
  } = useGetPostByIdQuery({ postId });

  const {
    data: userData,
    isSuccess: userSuccess,
    refetch: refetchUser,
  } = useGetUserWithIdApiQuery({ userId: postData?.user });

  const [user, setUser] = useState(null);
  const { data: getLikeData, isSuccess: isGetPostLikesSuccess } =
    useGetPostLikesQuery({
      postId,
      userId: user?.id,
    });

  const navigate = useNavigate();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  const [post, setPost] = useState(postData);
  const [isLiked, setIsLiked] = useState(false);
  const previewRef = useRef();
  const [following, setFollowing] = useState([]);
  const currentUser = useSelector(userAuthed);
  const [onFlyComment, setOnFlyComment] = useState("");
  const [pageRootUrl, setPageRootUrl] = useState(window.location.pathname);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateUnLike, setAnimatUnLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const imageRef = useRef(null);
  const [likePost, { data: likeData, error: likeError }] =
    useLikePostMutation();
  const [unlikePost, { data: unlikeData, error: unlikeError }] =
    useUnlikePostMutation();
  const [commentPost, { data: commentData, error: commentError }] =
    useCommentPostMutation();
  const [uncommentPost, { data: uncommentData, error: uncommentError }] =
    useUncommentPostMutation();

  const { data: getSavedData, isSuccess: isGetPostSavedSuccess } =
    useGetPostSavedQuery({ postId: post?._id, userId: user?.id });

  const [savePost, { data: saveData, error: saveError }] =
    useSavePostMutation();
  const [unsavePost, { data: unsaveData, error: unsaveError }] =
    useUnsavePostMutation();

  const handleLikePost = () => {
    likePost({ postId: post?._id, userId: currentUser?.id });
  };

  const handleUnlikePost = () => {
    unlikePost({ postId: post?._id, userId: currentUser?.id });
    // setAnimateLike(false);
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
    console.log(postData);
    console.log(postId, "postId");
    document.addEventListener("mousedown", handleClickOutside);
    window.history.pushState(
      null,
      "",
      `/post/${postId}/${origin}/${originUsername}`
    );
    setPageRootUrl(window.location.pathname);
    if (currentUser.id === post?.user) {
      setIsAuther(true);
      setUser(currentUser);
      setFollowing(currentUser.following);
    } else {
      if (!userSuccess) {
        refetchUser();
      } else {
        setUser(userData);
      }
      setIsAuther(false);
    }
    if (postSuccess) {
      setPost(postData);
    }

    if (isGetPostSavedSuccess) {
      setIsSaved(getSavedData.saved);
    }

    if (isGetPostLikesSuccess) {
      setLikes(getLikeData.likes);
      if (getLikeData.likes.includes(currentUser.id)) {
        setIsLiked(true);
        setAnimateLike(true);
      } else {
        setIsLiked(false);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    postSuccess,
    postData,
    postId,
    currentUser,
    post,
    userData,
    userSuccess,
    getLikeData,
    isGetPostLikesSuccess,
    isGetPostSavedSuccess,
    getSavedData,
  ]);

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
            // style={
            //   imageRef.current?.width < 1200
            //     ? imageRef.current?.width >= imageRef.current?.height
            //       ? { width: imageRef.current?.width }
            //       : {}
            //     : { width: "950px" }
            // }
          >
            <img src={post?.image} alt="post" ref={imageRef} />
          </div>
        )}
        <div className="post-preveiw-info-container">
          <div className="post-preveiw-user-info">
            <div className="post-preveiw-user-img">
              <img src={user?.picture} alt="user" />
            </div>
            <div className="post-preveiw-user-name">
              <h1>{user?.firstName + " " + user?.surName}</h1>
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
            />
          </div>
          <div className="post-preveiw-post-footer">
            <div className="post-preveiw-post-footer-icons">
              {/* <FavoriteBorderRoundedIcon
                onClick={() => console.log("like")}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              /> */}
              <div className="post-icon-with-numbers">
                <FavoriteRoundedIcon
                  onClick={() => {
                    setAnimateLike(!animateLike);
                    setAnimatUnLike(true);
                    handleUnlikePost();
                  }}
                  className={
                    animateLike
                      ? "post-like-under-icon post-like-animate"
                      : "post-like-under-icon "
                  }
                  sx={{
                    fontSize: 27,
                    color: "#b51d24",
                    cursor: "pointer",
                  }}
                />

                {animateUnLike && (
                  <>
                    <img
                      className={
                        animateUnLike
                          ? "post-like-heart-icon-left-preveiw animate-left-heart-preveiw"
                          : "post-like-heart-icon-left-preveiw"
                      }
                      src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAAC4jAAAuIwF4pT92AAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTA2LTE0VDA3OjUzOjAxKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA2LTE0VDA3OjUzOjAxKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNi0xNFQwNzo1MzowMSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiMjllNzE0MC02YTk1LTNjNDItYjVjMi1lNWQ1YTVjMDI0ZmEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjM1OWZiYS1iZTQ5LWU1NDEtYjVlMS03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"
                    />
                    <img
                      className={
                        animateUnLike
                          ? "post-like-heart-icon-right-preveiw animate-right-heart-preveiw"
                          : "post-like-heart-icon-right-preveiw"
                      }
                      src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAAC4jAAAuIwF4pT92AAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTA2LTE0VDA3OjUzOjE5KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA2LTE0VDA3OjUzOjE5KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNi0xNFQwNzo1MzoxOSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmNjM5ZTg5My0zMDFlLWRkNGItYTNmMC1jMWJkOTRjYjU5MmIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5YTQ4YzZjZi1kMDUyLTg4NDEtYjllMy0y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"
                    />
                  </>
                )}
                <FavoriteBorderRoundedIcon
                  className="post-like-upper-icon"
                  onClick={() => {
                    setAnimatUnLike(false);
                    setAnimateLike(!animateLike);
                    handleLikePost();
                  }}
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                />
                <p className="post-like-text-icon">{likes?.length || 0}</p>
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

              <ShortcutRoundIcon
                onClick={() => console.log("share")}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
              {isSaved ? (
                <BookmarkRoundedIcon
                  className="post-save-veiw"
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  onClick={handleUnsavePost}
                />
              ) : (
                <TurnedInNotRoundedIcon
                  className="post-save-veiw"
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  onClick={handleSavePost}
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
