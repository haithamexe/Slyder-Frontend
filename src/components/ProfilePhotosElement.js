import PostPreveiw from "./PostPreveiw";
import { useState } from "react";

const ProfilePhotosElement = ({ posts }) => {
  const [postId, setFetchPostId] = useState("");
  return (
    <div className="profile-photos-element">
      {posts?.length > 0 ? (
        <div className="profile-photos-container">
          {posts?.map(
            (post) =>
              post.image && (
                <img
                  src={post?.image}
                  key={post?._id}
                  alt="photo"
                  onClick={() => setFetchPostId(post._id)}
                />
              )
          )}
        </div>
      ) : (
        <div className="profile-photos-container">
          <h1 className="no-people">No photos</h1>
        </div>
      )}
      {postId && (
        <PostPreveiw postId={postId} setFetchPostId={setFetchPostId} />
      )}
    </div>
  );
};

export default ProfilePhotosElement;
