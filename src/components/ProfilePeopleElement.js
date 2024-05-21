import { useNavigate } from "react-router-dom";

const ProfilePeopleElement = ({ user, type }) => {
  const navigate = useNavigate();

  const people = type === "followers" ? user.followers : user.following;
  return (
    <div>
      <div className="profile-people-element">
        {people?.length > 0 ? (
          people?.map((person) => (
            <div
              key={person._id}
              className="user-profile-block"
              onClick={() => navigate("/" + person.username)}
            >
              <div className="user-profile-image-container">
                <img src={person?.profilePicture} alt="profile" />
              </div>
              <h1>{person.username}</h1>
            </div>
          ))
        ) : (
          <div className="no-people">No {type}</div>
        )}
        {}
      </div>
    </div>
  );
};

export default ProfilePeopleElement;
