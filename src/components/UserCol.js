import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PicDisplay from "./PicDisplay";
import {
  useGetFollowersApiQuery,
  useGetFollowingApiQuery,
} from "../features/user/userApiSlice";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";
const UserCol = ({ user }) => {
  const [communityScrolled, setCommunityScrolled] = useState(false);
  const [picDisplay, setPicDisplay] = useState("");
  const [followers, setFollwoers] = useState([]);
  const [following, setFollowing] = useState([]);
  const curUser = useSelector(userAuthed);
  const navigate = useNavigate();

  const { data: followersData } = useGetFollowersApiQuery({
    userId: curUser?.id,
  });
  const { data: followingData } = useGetFollowingApiQuery({
    userId: curUser?.id,
  });

  const handleScrollEnter = () => {
    setCommunityScrolled(true);
  };

  const handleScrollExit = () => {
    setCommunityScrolled(false);
  };

  useEffect(() => {
    if (followersData) {
      setFollwoers(followersData);
    }
    if (followingData) {
      setFollowing(followingData);
    }
  }, [followersData, followingData]);

  return (
    <>
      <div className="user-container">
        <div className="cover">
          {user?.cover && (
            <img
              src={user?.cover}
              alt="cover"
              onClick={() => setPicDisplay(user?.cover)}
            />
          )}
        </div>
        <div className="user-img">
          <img
            src={user?.picture}
            alt="user-picture"
            onClick={() => setPicDisplay(user?.picture)}
          />
        </div>
        <div className="user-head">
          <div className="followers-container">
            <div className="followers">
              <h2>{followers?.length}</h2>
              <p>Followers</p>
            </div>
          </div>
          <div className="following-container">
            <div className="following">
              <h2>{following?.length}</h2>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div className="user-info">
          <div className="user-body">
            <h1>{user?.firstName + " " + user?.surName}</h1>
            <p>@{user?.username}</p>
            <div className="bio">
              <h3>{user?.bio}</h3>
            </div>
          </div>
          <div className="user-footer">
            <button
              type="button"
              onClick={() => navigate("/" + user?.username)}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
      <div className="communities-container">
        <p>Communities</p>
        <div
          className={
            communityScrolled ? "communities communites-scroll" : "communities"
          }
          onMouseEnter={handleScrollEnter}
          onMouseLeave={handleScrollExit}
        >
          {/* <div className="community">
            <img src="/images/demo/post.jpg" alt="community" />
            <h1>Managers</h1>
          </div> */}
        </div>
      </div>
      {picDisplay && (
        <PicDisplay picDisplay={picDisplay} setPicDisplay={setPicDisplay} />
      )}
    </>
  );
};

export default UserCol;
