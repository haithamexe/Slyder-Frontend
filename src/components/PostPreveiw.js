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
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { userAuthed } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useGetPostByIdQuery } from "../features/post/postApiSlice";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { formatTimeAgo } from "../utils/formatTimeAgo";

const PostPreveiw = ({ postId, setFetchPostId }) => {
  const {
    data: postData,
    isSuccess: postSuccess,
    refetch: refetchPost,
  } = useGetPostByIdQuery(postId);

  const {
    data: userData,
    isSuccess: userSuccess,
    refetch: refetchUser,
  } = useGetUserWithIdApiQuery(postData?.user);

  const navigate = useNavigate();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  const [post, setPost] = useState(postData);
  const menuRef = useRef();
  const [following, setFollowing] = useState([]);
  const currentUser = useSelector(userAuthed);
  const [user, setUser] = useState(null);
  const [onFlyComment, setOnFlyComment] = useState("");

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setDropDownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (currentUser.id === post?.user) {
      setIsAuther(true);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    console.log("this is running");
  }, [postSuccess, postData, postId, currentUser, post]);

  return (
    <div className="post-preveiw-container">
      <div className="post-preveiw-inside-container">
        <CloseRounded
          className="post-preveiw-close-icon"
          sx={{
            fontSize: 27,
            color: "#a7c750;",
            cursor: "pointer",
          }}
          onClick={() => setFetchPostId("")}
        />
        {post?.image && (
          <div className="post-preveiw-img-container">
            <img src={post?.image} alt="post" />
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
          <div className="post-preveiw-post-comments-container">
            {post?.comments?.map((comment) => (
              <div className="post-preveiw-post-comment">
                <img src={comment.user.image} alt="user" />
                <h1>{comment.content}</h1>
              </div>
            ))}
          </div>
          <div className="post-preveiw-post-footer">
            <div className="post-preveiw-post-footer-icons">
              <FavoriteRoundedIcon
                onClick={() => console.log("like")}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
              <ChatRoundedIcon
                onClick={() => console.log("comment")}
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
              <SendRoundedIcon
                onClick={() => console.log("share")}
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
            <div className="post-preveiw-post-footer-comment">
              <img src={user?.picture} alt="user" />
              <input
                type="text"
                placeholder="Write a comment"
                value={onFlyComment}
                onChange={(e) => setOnFlyComment(e.target.value)}
              />
              <SendRoundedIcon
                className="post-comment-send-icon"
                sx={{
                  fontSize: 27,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log(onFlyComment);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreveiw;
