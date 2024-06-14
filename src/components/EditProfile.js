import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ShortcutRoundIcon from "@mui/icons-material/ShortcutRounded";
import TurnedInRoundIcon from "@mui/icons-material/TurnedInRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useUpdateUserApiMutation } from "../features/user/userApiSlice";
import { userActions } from "../features/user/userSlice";
import apiSlice from "../features/api/apiSlice";
const EditProfile = ({ setEditing, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [
    updateUser,
    { data: userUpdated, isSuccess: userUpdateSuccess, isLoading },
  ] = useUpdateUserApiMutation();

  const [userUpdates, setUserUpdates] = useState({
    username: "",
    firstName: "",
    surName: "",
    bio: "",
    picture: "",
    cover: "",
    skills: [],
    skill: "",
    website: "",
  });

  const handleEditSubmit = async () => {
    const userData = {};
    const dataCheck = () => {
      if (userUpdates.username !== user.username) {
        userData.username = userUpdates.username;
      }
      if (userUpdates.firstName !== user.firstName) {
        userData.firstName = userUpdates.firstName;
      }
      if (userUpdates.surName !== user.surName) {
        userData.surName = userUpdates.surName;
      }
      if (userUpdates.bio !== user.bio) {
        userData.bio = userUpdates.bio;
      }
      if (userUpdates.picture !== user.picture) {
        userData.picture = userUpdates.picture;
      }
      if (userUpdates.cover !== user.cover) {
        userData.cover = userUpdates.cover;
      }
      if (userUpdates.skills !== user.skills) {
        userData.skills = userUpdates.skills;
      }
      if (userUpdates.website !== user.website) {
        userData.website = userUpdates.website;
      }
    };
    dataCheck();
    console.log(userData, "userData");
    console.log(userUpdates, "userUpdates");
    updateUser({ userData, userId: user.id });
  };

  useEffect(() => {
    if (userUpdateSuccess) {
      setEditing(false);
      dispatch(userActions.clearUser());
      dispatch(
        apiSlice.util.invalidateTags([
          {
            type: ["User", "Post", "HomePost", "UserPost", "TrendPost"],
            id: userUpdated.id,
          },
        ])
      );
      navigate(`/${userUpdated.username}`);
    }

    setUserUpdates({
      username: user?.username,
      bio: user?.bio,
      picture: user?.picture,
      cover: user?.cover,
      skills: user?.skills,
      skill: "",
      website: user?.website,
      firstName: user?.firstName,
      surName: user?.surName,
    });
  }, [user, userUpdated, userUpdateSuccess]);

  const handleEditChange = (e) => {
    setUserUpdates({ ...userUpdates, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-edit-container-wrapper">
      <div className="profile-edit-container">
        <div className="profile-edit-header">
          <h1>Edit profile</h1>
          <CloseRoundedIcon
            onClick={() => setEditing(false)}
            sx={{
              fontSize: 24,
              color: "#a7c750;",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="profile-edit-body">
          <form>
            <div className="profile-edit-cover">
              {user?.cover && (
                <img src={userUpdates.cover || user?.cover} alt="user-cover" />
              )}
              <CameraEnhanceRoundedIcon
                className="profile-edit-img-btn-icon"
                sx={{
                  fontSize: 35,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="profile-edit-img">
              <img
                src={userUpdates.picture || user?.picture}
                alt="user-picture"
              />
              <CameraEnhanceRoundedIcon
                className="profile-edit-profile-btn-icon"
                sx={{
                  fontSize: 29,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />

              <div className="profile-edit-inputs-names">
                <div className="profile-edit-inputs-halfs">
                  <input
                    type="text"
                    value={userUpdates.firstName}
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => handleEditChange(e)}
                  />
                  <input
                    type="text"
                    value={userUpdates.surName}
                    placeholder="Surname"
                    name="surName"
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>
                <input
                  type="text"
                  value={userUpdates.username}
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleEditChange(e)}
                />
                <input
                  type="text"
                  value={userUpdates?.bio}
                  placeholder="Bio"
                  onChange={(e) => handleEditChange(e)}
                  name="bio"
                />
              </div>
            </div>

            <div className="skills-add">
              <div className="skills-header">
                {userUpdates?.skills?.map((skill) => (
                  <h1 className="edit-skill" key={skill}>
                    {skill}
                  </h1>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add skill"
                name="skill"
                value={userUpdates.skill}
                onChange={(e) => handleEditChange(e)}
              />
              <AddRoundedIcon
                onClick={() => {
                  setUserUpdates({
                    ...userUpdates,
                    skills: [...userUpdates.skills, userUpdates.skill],
                  });
                }}
                sx={{
                  fontSize: 24,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
            </div>
            <input
              type="text"
              value={userUpdates.website}
              name="website"
              onChange={(e) => handleEditChange(e)}
              placeholder="Website"
            />
            <button
              type="button"
              className="profile-edit-btn"
              onClick={handleEditSubmit}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
