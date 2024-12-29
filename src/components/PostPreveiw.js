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
import axios from "axios";

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

const PostPreveiw = ({
  postId,
  setFetchPostId,
  origin,
  originUsername,
  fetchedPost,
}) => {
  const navigate = useNavigate();
  const [isAuther, setIsAuther] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const previewRef = useRef();
  const currentUser = useSelector(userAuthed);
  const [onFlyComment, setOnFlyComment] = useState("");
  const [pageRootUrl, setPageRootUrl] = useState(window.location.pathname);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const [showMobileComments, setShowMobileComments] = useState(false);
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

  // const { data: post } = useGetPostQuery(postId);
  const [post, setPost] = useState(fetchedPost);

  const handleReaction = () => {
    if (isLiked) {
      unlikePost({ postId: post._id, userId: currentUser.id });
      setIsLiked(false);
      setPost((prev) => {
        return {
          ...prev,
          likes: prev?.likes?.filter((like) => like?.user !== currentUser?.id),
        };
      });
    } else {
      likePost({ postId: post._id, userId: currentUser.id });
      setIsLiked(true);
      setPost((prev) => {
        return {
          ...prev,
          likes: [...prev?.likes, { user: currentUser.id }],
        };
      });
      // setIsLiked(true);
    }
  };

  const handleSaveState = () => {
    if (isSaved) {
      unsavePost({ postId: post._id, userId: currentUser.id });
      setIsSaved(false);
      setPost((prev) => {
        return {
          ...prev,
          savedBy: prev?.savedBy?.filter(
            (save) => save?.user !== currentUser?.id
          ),
        };
      });
    } else {
      savePost({ postId: post._id, userId: currentUser.id });
      setIsSaved(true);
      setPost((prev) => {
        return {
          ...prev,
          savedBy: [...prev?.savedBy, { user: currentUser.id }],
        };
      });
      // savedBy: [...prev?.savedBy, { user: currentUser.id }],
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

    setPost((prev) => {
      return {
        ...prev,
        comments: [
          ...prev?.comments,
          {
            author: {
              _id: currentUser?.id,
              picture: currentUser?.picture,
              firstName: currentUser?.firstName,
              surName: currentUser?.surName,
              username: currentUser?.username,
            },
            content: onFlyComment,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
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

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 1100);
    });

    setIsMobile(window.innerWidth < 1100);

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 1100);
      });
    };
  }, []);

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
        }
      });

      setCommentsCount(post?.comments?.length);

      post?.savedBy?.map((save) => {
        if (save?.user === currentUser?.id) {
          setIsSaved(true);
          return;
        } 
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [post, postId]);

  useEffect(() => {
    if (postId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/post/${postId}`)
        .then((res) => {
          setPost(res.data);
          console.log(res.data.comments);
        })
        .catch((err) => console.log(err));
    }
  }, [postId]);

  // useEffect(() => {
  //   if (!isLiked) {
  //     setPost((prev) => {
  //       return {
  //         ...prev,
  //         likes: prev?.likes?.filter((like) => like?.user !== currentUser?.id),
  //       };
  //     });
  //   }
  // }, [isLiked]);
  const content = (
    <>
      (
      <div className="post-preveiw-container">
        <div className="post-preveiw-inside-container" ref={previewRef}>
          <div
            className={
              !isMobile
                ? "post-preveiw-user-info-mobile hide"
                : "post-preveiw-user-info-mobile "
            }
          >
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
            <>
              <div
                className="post-preveiw-img-container"
                style={
                  imageRef.current?.width >= imageRef.current?.height
                    ? { width: imageRef.current?.width }
                    : {}
                }
              >
                <img src={post?.image} alt="post" ref={imageRef} />

                <div
                  className={
                    !isMobile
                      ? "post-preveiw-img-mobile hide"
                      : "post-preveiw-img-mobile"
                  }
                >
                  <div className="post-preveiw-post-footer-icons">
                    <div className="post-icon-with-numbers mobile-numbers">
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
                    <div className="post-preveiw-post-footer-icons-comments mobile-comments">
                      <ChatBubbleOutlineRoundedIcon
                        onClick={() => setShowMobileComments(true)}
                        sx={{
                          fontSize: 27,
                          color: "#a7c750;",
                          cursor: "pointer",
                        }}
                      />
                      <p className="post-like-text-icon">
                        {commentsCount || 0}
                      </p>
                    </div>

                    {isSaved ? (
                      <BookmarkRoundedIcon
                        className="post-save-veiw mobile-save"
                        sx={{
                          fontSize: 27,
                          color: "#a7c750;",
                          cursor: "pointer",
                        }}
                        onClick={handleSaveState}
                      />
                    ) : (
                      <TurnedInNotRoundedIcon
                        className="post-save-veiw mobile-save"
                        sx={{
                          fontSize: 27,
                          color: "#a7c750;",
                          cursor: "pointer",
                        }}
                        onClick={handleSaveState}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div
                className={
                  !showMobileComments || !isMobile
                    ? "post-preveiw-post-comments-mobile hide"
                    : "post-preveiw-post-comments-mobile"
                }
              >
                <CloseRounded
                  className="mobile-comment-close"
                  sx={{
                    fontSize: 27,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowMobileComments(false)}
                />
                <h2 className="mobile-post-content"> {post?.content} </h2>
                <div className="post-preveiw-post-comments-mobile-list">
                  <CommentsList
                    // postId={post?._id}
                    setCommentsCount={setCommentsCount}
                    setFetchPostId={setFetchPostId}
                    comments={post?.comments}
                  />
                </div>
                <div className="post-preveiw-post-footer-comment mobile-input">
                  <img src={currentUser?.picture} alt="user" />
                  <input
                    type="text"
                    placeholder="Write a comment"
                    value={onFlyComment}
                    onChange={(e) => setOnFlyComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCommentPost();
                      }
                    }}
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
            </>
          )}
          <div
            className={
              isMobile
                ? "post-preveiw-info-container hide"
                : "post-preveiw-info-container"
            }
          >
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
                comments={post?.comments}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommentPost();
                    }
                  }}
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
    </>
  );
  return <>{post ? content : null}</>;
};

export default PostPreveiw;
