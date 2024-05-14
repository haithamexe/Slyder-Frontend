import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCol = ({ user }) => {
  const [communityScrolled, setCommunityScrolled] = useState(false);
  const navigate = useNavigate();

  const handleScrollEnter = () => {
    setCommunityScrolled(true);
  };

  const handleScrollExit = () => {
    setCommunityScrolled(false);
  };

  return (
    <>
      <div className="user-container">
        <div className="cover">
          {user?.cover && <img src={user?.cover} alt="cover" />}
        </div>
        <div className="user-img">
          <img src={user?.picture} alt="user-picture" />
        </div>
        <div className="user-head">
          <div className="followers-container">
            <div className="followers">
              <h2>{user?.followersNum}</h2>
              <p>Followers</p>
            </div>
          </div>
          <div className="following-container">
            <div className="following">
              <h2>{user?.followingNum}</h2>
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
          <div className="community">
            <img src="/images/demo/post.jpg" alt="community" />
            <h1>Managers</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCol;
