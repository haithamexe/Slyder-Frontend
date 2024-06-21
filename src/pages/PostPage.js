import React from "react";
import { useParams } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Trending from "../pages/Trending";

const PostPage = ({ option }) => {
  const { postId, username } = useParams();
  const content = () => {
    if (option === "feed") {
      return <Home redirectionPage={postId} />;
    }
    if (option === "profile") {
      return (
        <Profile redirectionPage={postId} redirectionUsername={username} />
      );
    }
    if (option === "trending") {
      return <Trending redirectionPage={postId} />;
    }
  };
  return content();
};

export default PostPage;
