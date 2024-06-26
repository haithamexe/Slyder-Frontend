import React from "react";
import { useGetPostByIdQuery } from "../features/post/postApiSlice";
import { useGetUserWithIdApiQuery } from "../features/user/userApiSlice";
import { useState, useEffect } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import Loader from "./Loader";

const Notification = ({ notification }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [sender, setSender] = useState([]);
  const [type, setType] = useState("");
  const {
    data: postData,
    isSuccess: postSuccess,
    isLoading: postisLoading,
  } = useGetPostByIdQuery({
    postId: notification?.post,
  });
  const {
    data: userData,
    isSuccess: userSuccess,
    isLoading: userisLoading,
  } = useGetUserWithIdApiQuery({
    userId: notification?.sender,
  });

  useEffect(() => {
    if (postSuccess) {
      setPost(postData);
    }
    if (userSuccess) {
      setLoading(false);
      setSender(userData);
    }
    if (notification?.type === "like") {
      setType(" liked your post");
    } else if (notification?.type === "comment") {
      setType(" commented on your post");
    } else if (notification?.type === "follow") {
      setType(" followed you");
    }
  }, [
    postSuccess,
    userSuccess,
    notification,
    postData,
    userData,
    postisLoading,
    userisLoading,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="notification">
          <div className="notification-info">
            <h1>
              <span>{sender?.firstName + " " + sender.surName}</span>
              {type}{" "}
              <span className="time-for-noty">
                {post && formatTimeAgo(notification?.createdAt)}
              </span>
            </h1>
          </div>
          <div className="notification-img">
            <img src={post?.image} alt="notification" />
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
