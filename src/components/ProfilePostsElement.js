import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";
import Post from "./Post";
import PostPreveiw from "./PostPreveiw";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const ProfilePostsElement = ({ user, posts, setNewPost }) => {
  const curUser = useSelector(userAuthed);
  const [postId, setFetchPostId] = useState("");
  const [fetchedPost, setFetchedPost] = useState(null);

  const content = (
    <>
      <div className="feed-in-profile-container">
        {curUser?.username === user?.username && (
          <div className="post">
            <div className="post-input-img">
              {/* <div className="post-input-img-wrapper">
                <img src={curUser?.picture} alt="post" />
              </div> */}
              <button
                type="button"
                className="post-new-button"
                onClick={() => {
                  console.log("clicked");
                  setNewPost(true);
                }}
              >
                What's on your mind?
                <AddRoundedIcon
                  className="post-new-button-icon-newPost-icon"
                  style={{ color: "#a7c750", fontSize: "2rem" }}
                />
              </button>
            </div>
          </div>
        )}
        <div className="feed-in-profile">
          {posts?.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              setFetchPostId={setFetchPostId}
              setFetchedPost={setFetchedPost}
            />
          ))}
        </div>
      </div>
      {postId && (
        <PostPreveiw
          postId={postId}
          setFetchPostId={setFetchPostId}
          origin="profile"
          originUsername={user?.username}
          setFetchedPost={setFetchedPost}
        />
      )}
    </>
  );

  return posts?.length > 0 ? (
    content
  ) : (
    <div className="no-posts">
      <h1>No posts yet</h1>
    </div>
  );
};

export default ProfilePostsElement;
