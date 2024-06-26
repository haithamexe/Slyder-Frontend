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

  const { data: getSavedData, isSuccess: isGetPostSavedSuccess } =
    useGetPostSavedQuery({ postId: post?._id, userId: user?.id });

  const [savePost, { data: saveData, error: saveError }] =
    useSavePostMutation();
  const [unsavePost, { data: unsaveData, error: unsaveError }] =
    useUnsavePostMutation();

  const handleLikePost = () => {
    if (!likeLoading && !unlikeLoading) {
      likePost({ postId: post?._id, userId: currentUser?.id });
    }
    // setAnimateUnLike(true);
    // setAnimatUnLike(true);}
  };

  const handleUnlikePost = () => {
    if (!likeLoading && !unlikeLoading) {
      unlikePost({ postId: post?._id, userId: currentUser?.id });
    }
    // setAnimateLike(true);
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
      setIsLiked(getLikeData.userHasLiked);

      console.log(getLikeData, "getLikeData");
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
    origin,
    originUsername,
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
              <img
                src={user?.picture}
                alt="user"
                onClick={() => navigate("/" + user?.username)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="post-preveiw-user-name">
              <h1
                onClick={() => navigate("/" + user?.username)}
                style={{ cursor: "pointer" }}
              >
                {user?.firstName + " " + user?.surName}
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
                {/* <FavoriteRoundedIcon
                  onClick={() => {
                    setAnimateLike(!animateLike);
                    setAnimatUnLike(true);
                    handleUnlikePost();
                  }}
                  className={
                    isLiked
                      ? "post-like-under-icon post-like-animate"
                      : "post-like-under-icon "
                  }
                  sx={{
                    fontSize: 27,
                    color: "#b51d24",
                    cursor: "pointer",
                  }}
                /> */}

                {/* <>
                  <img
                    className={
                      isLiked
                        ? "post-like-heart-icon-left-preveiw animate-left-heart-preveiw"
                        : "post-like-heart-icon-left-preveiw"
                    }
                   
                  />
                </> */}

                {/* <FavoriteBorderRoundedIcon
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
                /> */}

                {isLiked ? (
                  <FavoriteRoundedIcon
                    className={
                      isLiked
                        ? "post-Unlike-new post-like-animate"
                        : "post-Unlike-new "
                    }
                    onClick={() => {
                      // handleLikePost();
                      handleUnlikePost();
                    }}
                    sx={{
                      fontSize: 27,
                      color: "#b51d24;",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <FavoriteBorderRoundedIcon
                    className="post-like-new"
                    onClick={() => {
                      handleLikePost();
                    }}
                    sx={{
                      fontSize: 27,
                      color: "#a7c750;",
                      cursor: "pointer",
                    }}
                  />
                )}

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

              {/* <ShortcutRoundIcon
                onClick={() => console.log("share")}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              /> */}
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
