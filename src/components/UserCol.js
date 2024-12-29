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
import FollowersDisplay from "./FollowersDisplay";

const UserCol = ({ user }) => {
  const curUser = useSelector(userAuthed);
  const { data: followersData } = useGetFollowersApiQuery({
    userId: curUser?.id,
  });
  const { data: followingData, isSuccess } = useGetFollowingApiQuery({
    userId: curUser?.id,
  });

  const [communityScrolled, setCommunityScrolled] = useState(false);
  const [picDisplay, setPicDisplay] = useState("");
  const [followers, setFollwoers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

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
  }, [followersData, followingData, isSuccess]);

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
              <h2>{followersData?.length ?? 0}</h2>
              <p>Followers</p>
            </div>
          </div>
          <div className="following-container">
            <div className="following">
              <h2>{followingData?.length ?? 0}</h2>
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
        <p>Friends</p>
        <div
          className={
            window.innerWidth < 1200 || communityScrolled
              ? "communities communites-scroll"
              : "communities"
          }
          onMouseEnter={handleScrollEnter}
          onMouseLeave={handleScrollExit}
        >
          <div className="active-people">
            <div className="active-people-list">
              {following?.map((person) => (
                <FollowersDisplay key={person} person={person} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {picDisplay && (
        <PicDisplay picDisplay={picDisplay} setPicDisplay={setPicDisplay} />
      )}
    </>
  );
};

export default UserCol;
