import { useEffect, useState, useRef } from "react";
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
import Resizer from "react-image-file-resizer";

const EditProfile = ({ setEditing, user }) => {
  const [curWidth, setCurWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef1 = useRef();
  const fileRef2 = useRef();
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
    cover: "",
    picture: "",
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

  const handleRemove = (e) => {
    const skill = e.target.innerText;
    setUserUpdates({
      ...userUpdates,
      skills: userUpdates.skills.filter((s) => s !== skill),
    });
  };

  const handleWindowChange = () => {
    setCurWidth(window.innerWidth);
  };

  const handleSkillChange = (e) => {
    const skill = userUpdates.skill;
    const skills = userUpdates.skills;
    if (skills.includes(skill)) {
      return;
    }

    setUserUpdates({
      ...userUpdates,
      skills: [...userUpdates.skills, userUpdates.skill],
      skill: "",
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowChange);
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

    return () => {
      window.removeEventListener("resize", handleWindowChange);
    };
  }, [user, userUpdated, userUpdateSuccess]);

  const handleEditChange = (e) => {
    setUserUpdates({ ...userUpdates, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        Resizer.imageFileResizer(
          file,
          1920, // max width
          1920, // max height
          "JPEG", // compress format
          60, // quality
          0, // rotation
          (uri) => {
            setUserUpdates({ ...userUpdates, [e.target.name]: uri });
          },
          "base64" // output type
        );
      } catch (err) {
        console.error("Error resizing the image:", err);
      }
    }
  };

  return (
    <div className="profile-edit-container">
      <div
        className="profile-edit-header-close"
        onClick={() => setEditing(false)}
      >
        <CloseRoundedIcon
          sx={{
            fontSize: 25,
            color: "#a7c750;",
            cursor: "pointer",
          }}
        />
        <h1>Close</h1>
      </div>
      <h1>Edit profile</h1>
      <div className="profile-edit-body">
        {curWidth > 1200 && (
          <div className="profile-edit-left">
            <div className="profile-edit-photos">
              <div className="profile-edit-cover">
                {userUpdates.cover && <img src={userUpdates?.cover} />}
                <input
                  type="file"
                  ref={fileRef1}
                  onChange={handleFileChange}
                  accept="image/*"
                  name="cover"
                  style={{ display: "none" }}
                />
                <CameraEnhanceRoundedIcon
                  className="profile-edit-img-btn-icon"
                  sx={{
                    fontSize: 37,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  name="cover"
                  onClick={() => {
                    fileRef1.current.click();
                  }}
                />
                <p
                  className="edit-images-text-cover"
                  onClick={() => fileRef1.current.click()}
                >
                  Change Cover picture
                </p>
              </div>
              <div className="profile-edit-img">
                <img src={userUpdates?.picture} alt="user-picture" />
                <input
                  type="file"
                  ref={fileRef2}
                  onChange={handleFileChange}
                  accept="image/*"
                  name="picture"
                  style={{ display: "none" }}
                />
                <CameraEnhanceRoundedIcon
                  className="profile-edit-img-btn-icon"
                  name="picture"
                  sx={{
                    fontSize: 37,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                  onClick={() => fileRef2.current.click()}
                />
                <p
                  className="edit-images-text"
                  onClick={() => fileRef2.current.click()}
                >
                  Change Profile picture
                </p>
              </div>
            </div>
            <div className="profile-edit-skills">
              <div className="skills-add">
                <div className="skills-inputs">
                  <input
                    type="text"
                    placeholder="Add skill"
                    name="skill"
                    value={userUpdates.skill}
                    onChange={(e) => handleEditChange(e)}
                  />
                  <AddRoundedIcon
                    onClick={handleSkillChange}
                    sx={{
                      fontSize: 35,
                      color: "#a7c750;",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="skills-header">
                  {userUpdates?.skills?.map((skill) => (
                    <h1
                      className="edit-skill"
                      key={skill}
                      onClick={handleRemove}
                    >
                      {skill}
                    </h1>
                  ))}
                </div>
                <p className="edit-skill-remove">click on skill to remove</p>
              </div>
            </div>
          </div>
        )}
        <div className="profile-edit-right">
          <div className="profile-edit-inputs">
            <div className="profile-edit-input-names">
              <div className="profile-edit-input">
                <label>First Name</label>
                <input
                  type="text"
                  value={userUpdates.firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => handleEditChange(e)}
                />
              </div>
              <div className="profile-edit-input">
                <label>Surname</label>
                <input
                  type="text"
                  value={userUpdates.surName}
                  placeholder="Surname"
                  name="surName"
                  onChange={(e) => handleEditChange(e)}
                />
              </div>
            </div>
            <div className="profile-edit-input">
              <label>Username</label>
              <input
                type="text"
                value={userUpdates.username}
                placeholder="Username"
                name="username"
                onChange={(e) => handleEditChange(e)}
              />
            </div>
            <div className="profile-edit-input">
              <label>Bio</label>
              <input
                type="text"
                value={userUpdates?.bio}
                placeholder="Bio"
                onChange={(e) => handleEditChange(e)}
                name="bio"
              />
            </div>
            <div className="profile-edit-input">
              <label>Website</label>
              <input
                type="text"
                value={userUpdates.website}
                name="website"
                onChange={(e) => handleEditChange(e)}
                placeholder="Website"
              />
            </div>
          </div>
          <button
            type="button"
            className="profile-edit-btn"
            onClick={handleEditSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
