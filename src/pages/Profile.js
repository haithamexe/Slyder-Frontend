import "../styles/profile.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { userAuthed } from "../features/user/userSlice";
import ProfilePostsElement from "../components/ProfilePostsElement";
import ProfilePeopleElement from "../components/ProfilePeopleElement";
import ProfilePhotosElement from "../components/ProfilePhotosElement";
import ProfileCommunitiesElement from "../components/ProfileCommunitiesElement";
import EditProfile from "../components/EditProfile";
import { useDispatch, useSelector } from "react-redux";
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
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { userPosts, postActions } from "../features/post/postSlice";
import {
  useGetUserWithUsernameApiQuery,
  useGetFollowersApiQuery,
  useGetFollowingApiQuery,
  useFollowUserApiMutation,
  useUnFollowUserApiMutation,
} from "../features/user/userApiSlice";
import { useGetPostsByUserNameQuery } from "../features/post/postApiSlice";

import Post from "../components/Post";
import NewPost from "../components/NewPost";
import PostPreveiw from "../components/PostPreveiw";
import PicDisplay from "../components/PicDisplay";
import axios from "axios";

const Profile = ({ redirectionPage, redirectionUsername }) => {
  const [newPost, setNewPost] = useState(false);
  const [postId, setFetchPostId] = useState("");
  // const posts = useSelector(userPosts);
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector(userAuthed);
  const [clickedItem, setClickedItem] = useState("Posts");
  const [ableToEdit, setAbleToEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [picDisplay, setPicDisplay] = useState("");
  const [isFollowed, setIsFollowed] = useState(null);
  const { username } = useParams();
  const [fetchedPosts, setFetchPosts] = useState([]);
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  // const {
  //   data: postsData,
  //   isSuccess: fetchedPosts,
  //   refetch: refetchPosts,
  //   isError,
  // } = useGetPostsByUserNameQuery(username);

  const { data: followersData, isSuccess: fetchedFollowers } =
    useGetFollowersApiQuery({ userId: user?.id });
  const { data: followingData, isSuccess: fetchedFollowing } =
    useGetFollowingApiQuery({ userId: user?.id });

  // const {
  //   data: userData,
  //   isSuccess: fetchedUser,
  //   refetch: userRefetch,
  // } = useGetUserWithUsernameApiQuery(redirectionUsername || username);

  const [followUser, { isSuccess: followSuccess }] = useFollowUserApiMutation();
  const [unFollowUser, { isSuccess: unFollowSuccess }] =
    useUnFollowUserApiMutation();

  const handleFollowUser = () => {
    followUser({ userId: currentUser.id, followId: user.id });
  };

  const handleUnFollowUser = () => {
    unFollowUser({ userId: currentUser.id, unFollowId: user.id });
  };

  const fetchUser = async () => {
    try {
      const data = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_BACKEND_URL + "api/user/username/" + username,
      });
      setUser(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const data = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_BACKEND_URL + "api/post/user/" + user?.username,
      });
      // setFetchPosts(data?.data);
      setPosts(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser?.username === username) {
      setAbleToEdit(true);
      setUser(currentUser);
    } else {
      setAbleToEdit(false);
      fetchUser();
    }
    if (redirectionPage) {
      setFetchPostId(redirectionPage);
    }

    // if (redirectionPage || redirectionUsername) {
    //   setFetchPostId("");
    // }
  }, [
    currentUser,
    username,
    fetchedPosts,
    redirectionUsername,
    redirectionPage,
    followersData,
    fetchedFollowers,
    fetchedFollowing,
    followSuccess,
    unFollowSuccess,
    // user,
  ]);

  useEffect(() => {
    fetchUserPosts();

    if (user) {
      let isFollowed = false;
      user.followers?.map((follower) => {
        if (follower._id === currentUser.id) {
          isFollowed = true;
          return;
        }
      });
      setIsFollowed(isFollowed);
    }
  }, [user, newPost]);

  return (
    <div className="profile">
      {editing && ableToEdit ? (
        <EditProfile setEditing={setEditing} user={user} />
      ) : (
        <div className="profile-container">
          <div className="go-back" onClick={() => navigate(-1)}>
            <ArrowBackRoundedIcon
              sx={{
                fontSize: 30,
                color: "#a7c750;",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="profile-head-container">
            <div className="profile-head-container-inner">
              <div className="user-profile-cover">
                {user?.cover && (
                  <img
                    src={user?.cover}
                    alt="cover"
                    onClick={() => setPicDisplay(user?.cover)}
                  />
                )}
              </div>
              <div className="user-header-body">
                <div className="user-profile-header-body-img">
                  <img
                    src={user?.picture}
                    alt="user-picture"
                    onClick={() => setPicDisplay(user?.picture)}
                  />
                </div>
                <div className="user-header-info">
                  <div className="user-header-info-left">
                    <h1>{user?.firstName + " " + user?.surName}</h1>
                    <p>@{user?.username}</p>
                    <div className="user-header-info-numbers">
                      <p>{user?.followers?.length ?? 0} Followers</p>
                      <p>{user?.following?.length ?? 0} Following</p>
                    </div>
                  </div>
                  {user?.username === currentUser?.username && (
                    <button
                      className="user-header-info-btn"
                      onClick={() => setEditing(true)}
                    >
                      <EditRoundedIcon
                        sx={{
                          fontSize: 24,
                          color: "#a7c750;",
                          cursor: "pointer",
                        }}
                      />
                      <span>Edit profile</span>
                    </button>
                  )}
                  <div className="user-header-info-btns">
                    {user?.username !== currentUser?.username &&
                      (!isFollowed ? (
                        <button
                          className="user-header-info-btn"
                          onClick={handleFollowUser}
                        >
                          <span>Follow</span>
                        </button>
                      ) : (
                        <button
                          className="user-header-info-btn"
                          onClick={handleUnFollowUser}
                        >
                          <span>Unfollow</span>
                        </button>
                      ))}
                    {user?.username !== currentUser?.username && (
                      <button className="user-header-info-btn">
                        <span>Message</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="user-profile-options">
                <p
                  className={
                    clickedItem === "Posts"
                      ? "user-profile-options-clicked"
                      : ""
                  }
                  onClick={() => setClickedItem("Posts")}
                >
                  Posts
                </p>
                <p
                  className={
                    clickedItem === "Followers"
                      ? "user-profile-options-clicked"
                      : ""
                  }
                  onClick={() => setClickedItem("Followers")}
                >
                  Followers
                </p>
                <p
                  className={
                    clickedItem === "Following"
                      ? "user-profile-options-clicked"
                      : ""
                  }
                  onClick={() => setClickedItem("Following")}
                >
                  Following
                </p>
                <p
                  className={
                    clickedItem === "Photos"
                      ? "user-profile-options-clicked"
                      : ""
                  }
                  onClick={() => setClickedItem("Photos")}
                >
                  Photos
                </p>
                {/* <p
                  className={
                    clickedItem === "Communities"
                      ? "user-profile-options-clicked"
                      : ""
                  }
                  onClick={() => setClickedItem("Communities")}
                >
                  Communities
                </p> */}
                {/* <MoreVertRoundedIcon
                  className="user-profile-options-icon"
                  sx={{
                    fontSize: 24,
                    color: "#a7c750;",
                    cursor: "pointer",
                  }}
                /> */}
              </div>
            </div>

            <div className="profile-container-inner">
              <h1 className="user-profile-bio">{user?.bio}</h1>
              <div className="skills-container">
                <p>Skills</p>
                <div className="skills">
                  {user?.skills?.map((skill) => (
                    <h1 key={skill}>{skill}</h1>
                  ))}
                </div>
              </div>
              <div className="photos-container">
                <div className="photos-header">
                  <h1>Photos</h1>
                  <h2
                    onClick={() => {
                      setClickedItem("Photos");
                    }}
                  >
                    See all
                  </h2>
                </div>
                <div className="profile-photos-body">
                  {posts
                    ?.filter((post) => post.image !== "")
                    .slice(0, 6)
                    .map(
                      (post) =>
                        post.image !== " " && (
                          <img
                            src={post.image}
                            alt="post"
                            key={post.id}
                            onClick={() => setFetchPostId(post._id)}
                          />
                        )
                    )}
                </div>
              </div>
              {/* <div className="profile-followers-container">
                <div className="profile-followers-header">
                  <h1>Followers</h1>
                  <h2
                    onClick={() => {
                      setClickedItem("Followers");
                    }}
                  >
                    See all
                  </h2>
                </div>
                <div className="profile-followers-body">
                  {user?.followers?.slice(0, 6)?.map((follower) => (
                    <ProfilePeopleElement user={follower} />
                  ))}
                </div>
              </div> */}
            </div>
          </div>
          <div className="profile-body-container">
            {clickedItem === "Posts" && (
              <ProfilePostsElement
                user={user}
                posts={posts}
                setNewPost={setNewPost}
              />
            )}

            {clickedItem === "Followers" && (
              <ProfilePeopleElement users={user?.followers} type="Followers" />
            )}
            {clickedItem === "Following" && (
              <ProfilePeopleElement users={user?.following} type="Following" />
            )}
            {clickedItem === "Photos" && (
              <ProfilePhotosElement posts={posts} user={user} />
            )}
            {/* {clickedItem === "Communities" && (
              <ProfileCommunitiesElement user={user} />
            )} */}
          </div>
        </div>
      )}
      <NewPost setNewPost={setNewPost} newPost={newPost} />
      {postId && (
        <PostPreveiw
          postId={redirectionPage || postId}
          setFetchPostId={setFetchPostId}
          origin="profile"
          originUsername={user?.username}
        />
      )}
      {picDisplay && (
        <PicDisplay picDisplay={picDisplay} setPicDisplay={setPicDisplay} />
      )}
    </div>
  );
};

export default Profile;
