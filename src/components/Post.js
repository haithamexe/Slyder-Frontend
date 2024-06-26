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
} from "../features/post/postApiSlice";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../utils/formatTimeAgo";

const Post = ({ postId, setFetchPostId }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateUnLike, setAnimatUnLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector(userAuthed);
  const [onFlyComment, setOnFlyComment] = useState("");
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postIsLoading, setPostIsLoading] = useState(true);
  const { data: fetchedPost, isSuccess: isPostSuccess } = useGetPostByIdQuery({
    postId,
  });
  const { data: userData, isSuccess: isUserSuccess } = useGetUserWithIdApiQuery(
    { userId: post?.user }
  );
  const { data: getLikeData, isSuccess: isGetPostLikesSuccess } =
    useGetPostLikesQuery({ postId, userId: currentUser.id });

  const [deletePost, { isSuccess: isDeleteSuccess }] = useDeletePostMutation();

  const { data: getCommentData, isSuccess: isGetPostCommentsSuccess } =
    useGetPostCommentsQuery({ postId: post?._id });

  const { data: isSavedPost, isSuccess: isGetPostSavedSuccess } =
    useGetPostSavedQuery({ postId: post?._id, userId: currentUser.id });

  const [likePost, { isSuccess: isLikeSuccess, isLoading: isLikingLoading }] =
    useLikePostMutation();
  const [
    unlikePost,
    { isSuccess: isUnlikeSuccess, isLoading: isUnlikeLoading },
  ] = useUnlikePostMutation();
  const [commentPost, { isSuccess: isCommentSuccess }] =
    useCommentPostMutation();

  const [savePost, { isSuccess: isSaveSuccess }] = useSavePostMutation();

  const [unsavePost, { isSuccess: isUnsaveSuccess }] = useUnsavePostMutation();

  const menuRef = useRef();
  const [following, setFollowing] = useState([]);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setDropDownMenu(false);
    }
  };

  const handleDeletePost = () => {
    console.log("deleting post");
    deletePost(post._id);
    setDropDownMenu(false);
  };

  const handleLikePost = () => {
    if (!isLikingLoading && !isUnlikeLoading) {
      likePost({ postId: post._id, userId: currentUser.id });
    }
  };

  const handleUnlikePost = () => {
    if (!isLikingLoading && !isUnlikeLoading) {
      unlikePost({ postId: post._id, userId: currentUser.id });
    }
  };

  const handleCommentPost = () => {
    if (onFlyComment || !onFlyComment === "") {
      commentPost({
        postId: post._id,
        userId: currentUser.id,
        comment: onFlyComment,
      });
      setOnFlyComment("");
    }
  };

  const handleSavePost = () => {
    savePost({ postId: post._id, userId: currentUser.id });
  };

  const handleUnsavePost = () => {
    unsavePost({ postId: post._id, userId: currentUser.id });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (isPostSuccess && !isUserSuccess) {
      setPost(fetchedPost);
    }
    if (isGetPostLikesSuccess) {
      setLikes(getLikeData.likes);
      setIsLiked(getLikeData.userHasLiked);
    }
    if (isGetPostCommentsSuccess) {
      setComments(getCommentData);
    }
    if (isUserSuccess) {
      setUser(userData);
      if (currentUser.id === post?.user) {
        setIsAuther(true);
        setFollowing(currentUser.following);
      } else {
        setIsAuther(false);
      }
      setPostIsLoading(false);
    }
    if (isGetPostSavedSuccess) {
      setIsSaved(isSavedPost.saved);
      // console.log(isSavedPost, "isSavedPost");
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isPostSuccess,
    postId,
    isUserSuccess,
    fetchedPost,
    userData,
    currentUser,
    isGetPostLikesSuccess,
    getLikeData,
    isDeleteSuccess,
    isGetPostCommentsSuccess,
    isCommentSuccess,
    getCommentData,
    isGetPostSavedSuccess,
    isSavedPost,
  ]);

  const content = (
    <>
      <div className="feed-post">
        <div className="feed-post-header">
          <div className="feed-post-header-img">
            <img src={user?.picture} alt="post" />
          </div>
          <div className="feed-post-header-info">
            <div className="feed-post-header-info-name">
              <h1 onClick={() => navigate("/" + user?.username)}>
                {user?.firstName + " " + user?.surName}
              </h1>
              {post && (
                <p title={post?.createdAt}>{formatTimeAgo(post?.createdAt)}</p>
              )}
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
              {dropDownMenu && isAuther && (
                <div className="post-menu-options" ref={menuRef}>
                  {/* <div className="post-menu-option">
                    <InsertLinkRoundedIcon
                      sx={{
                        fontSize: 27,
                        color: "#a7c750;",
                        cursor: "pointer",
                      }}
                    />
                    <p>Copy Link</p>
                  </div> */}
                  {/* {!isAuther && (
                    <>
                      {following?.includes(post?.user) && (
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
                      )} */}
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
                  {/* </> */}
                  {/* )} */}
                  {isAuther && (
                    <>
                      {/* <div className="post-menu-option">
                        <EditRoundedIcon
                          sx={{
                            fontSize: 27,
                            color: "#a7c750;",
                            cursor: "pointer",
                          }}
                        />
                        <p>Edit</p>
                      </div> */}
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
          <div className="post-icon-with-numbers">
            {/* <FavoriteRoundedIcon
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
            /> */}

            {/* <FavoriteRoundedIcon
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
            /> */}
            {isLiked ? (
              <FavoriteRoundedIcon
                onClick={() => {
                  handleUnlikePost();
                }}
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
            <p>{comments?.length}</p>
          </div>
          {/* <ShortcutRoundIcon
            sx={{
              fontSize: 27,
              color: "#a7c750;",
              cursor: "pointer",
            }}
          /> */}
          {isSaved ? (
            <BookmarkRoundedIcon
              className="post-save"
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={handleUnsavePost}
            />
          ) : (
            <TurnedInNotRoundedIcon
              className="post-save"
              sx={{
                fontSize: 27,
                color: "#a7c750;",
                cursor: "pointer",
              }}
              onClick={handleSavePost}
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
  return (
    <>
      {postIsLoading ? (
        <div className="home">
          <div className="loader-box">
            <Loader />
          </div>
        </div>
      ) : (
        content
      )}
    </>
  );
};

export default Post;
