import { useNavigate } from "react-router-dom";

const ProfileCommunitiesElement = ({ user }) => {
  const navigate = useNavigate();
  const communities = user.communities;
  return (
    <div className="profile-communities-element">
      {communities?.length > 0 ? (
        <div className="profile-communities-container">
          {communities?.map((community) => (
            <img
              key={community._id}
              className="profile-community"
              src={community}
              alt="community"
            />
          ))}
        </div>
      ) : (
        <div className="profile-communities-container">
          <h1 className="no-people">No communities</h1>
        </div>
      )}
    </div>
  );
};

export default ProfileCommunitiesElement;
