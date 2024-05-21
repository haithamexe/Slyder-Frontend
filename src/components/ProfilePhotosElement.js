import { useNavigate } from "react-router-dom";

const ProfilePhotosElement = ({ user, posts }) => {
  const navigate = useNavigate();
  return (
    <div className="profile-photos-element">
      {posts?.length > 0 ? (
        <div className="profile-photos-container">
          {posts?.map(
            (post) =>
              post.image && (
                <img src={post?.image} key={post?._id} alt="photo" />
              )
          )}
        </div>
      ) : (
        <div className="profile-photos-container">
          <h1 className="no-people">No photos</h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotosElement;
