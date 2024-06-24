import PostPreveiw from "./PostPreveiw";
import { useState } from "react";

const ProfilePhotosElement = ({ posts }) => {
  const [postId, setFetchPostId] = useState("");

  const content = (
    <div className="profile-photos-element">
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

      {postId && (
        <PostPreveiw postId={postId} setFetchPostId={setFetchPostId} />
      )}
    </div>
  );
  return posts?.length > 0 ? (
    content
  ) : (
    <div className="no-Photos-element">
      <h1>No Photos</h1>
    </div>
  );
};

export default ProfilePhotosElement;
