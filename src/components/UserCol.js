import React from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useEffect, useState } from "react";
const UserCol = () => {
  const [communityScrolled, setCommunityScrolled] = useState(false);

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
          <img src="/images/demo/cover2.png" alt="cover" />
          <button type="button" className="options">
            <MoreVertRoundedIcon
              sx={{
                fontSize: 30,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </button>
          {/* <button type="button" className="exit">
            x
          </button> */}
        </div>
        <div className="user-img">
          <img src="/images/demo/3.png" alt="user" />
        </div>
        <div className="user-head">
          <div className="followers-container">
            <div className="followers">
              <h2>9999</h2>
              <p>Followers</p>
            </div>
          </div>
          <div className="following-container">
            <div className="following">
              <h2>9999</h2>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div className="user-info">
          <div className="user-body">
            <h1>John Doe</h1>
            <p>@johnDoe</p>
            <div className="bio">
              <h3>hello this is my bio hehe, pew pew</h3>
            </div>
          </div>
          <div className="user-footer">
            <button>Profile</button>
          </div>
        </div>
      </div>
      <div className="skills-container">
        <p>Skills</p>
        <div className="skills">
          <h1>Art</h1>
          <h1>Coding</h1>
          <h1>Pew Pew</h1>
          <h1>Accelrator</h1>
          <h1>Web Dev</h1>
          <h1>pew pew</h1>
          <h1>Web Dev</h1>
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
          <div className="community">
            <img src="/images/demo/post.jpg" alt="community" />
            <h1>Managers</h1>
          </div>
          <div className="community">
            <img src="/images/demo/post.jpg" alt="community" />
            <h1>Managers</h1>
          </div>
          <div className="community">
            <img src="/images/demo/post.jpg" alt="community" />
            <h1>Managers</h1>
          </div>
          <div className="community">
            <img src="/images/demo/post.jpg" alt="community" />
            <h1>Managers</h1>
          </div>
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
