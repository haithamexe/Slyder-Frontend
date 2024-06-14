import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { useState } from "react";
import Post from "./Post";
import PostPreveiw from "./PostPreveiw";

const ProfilePostsElement = ({ user, posts, setNewPost }) => {
  const [postId, setFetchPostId] = useState("");
  return (
    <>
      <div className="feed-in-profile-container">
        <div className="post">
          <div className="post-input-img">
            <img src={user?.picture} alt="post" />
            <button
              type="button"
              className="post-new-button"
              onClick={() => {
                console.log("clicked");
                setNewPost(true);
              }}
            >
              What's on your mind?
            </button>
          </div>
        </div>
        <div className="feed-in-profile">
          {posts?.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              setFetchPostId={setFetchPostId}
            />
          ))}
        </div>
      </div>
      {postId && (
        <PostPreveiw postId={postId} setFetchPostId={setFetchPostId} />
      )}
    </>
  );
};

export default ProfilePostsElement;
