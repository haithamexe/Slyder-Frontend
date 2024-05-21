import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
// import { useEffect } from "react";

import Post from "./Post";

const ProfilePostsElement = ({
  user,
  posts,
  setNewPost,
  setFetchPostId,
  refetchPosts,
}) => {
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
              key={post.id}
              post={post}
              setFetchPostId={setFetchPostId}
              type="profile"
              refetchPosts={refetchPosts}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePostsElement;
