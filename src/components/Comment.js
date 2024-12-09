import { useGetPostCommentByIdQuery } from "../features/post/postApiSlice";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Comment = ({ commentId, setFetchPostId, comment }) => {
  const navigate = useNavigate();
  // const { data: comment, isSuccess: isCommentFetchSuccess } =
  //   useGetPostCommentByIdQuery({ commentId });

  const content = (
    <div className="comment-individual">
      <div className="post-comment-user-img">
        <img
          src={comment?.author?.picture}
          alt="user"
          onClick={() => {
            setFetchPostId("");
            navigate("/" + comment?.author?.username);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="post-comment-container-parts">
        <div className="post-comment-container-partI">
          {/* <div className="post-comment-user-info"> */}
          <h1 className="post-comment-user-name">
            <span
              className="comment-username"
              onClick={() => {
                setFetchPostId("");
                navigate("/" + comment?.author?.username);
              }}
              style={{ cursor: "pointer" }}
            >
              {comment?.author?.username}
            </span>
            {" " + comment?.content}
          </h1>
          {/* </div> */}
          {/* <div className="post-comment-likes">{comment?.likes.length} likes</div> */}
        </div>
        <div className="post-comment-container-interactive">
          <h2 className="post-comment-date">
            {comment.createdAt && formatTimeAgo(comment?.createdAt)}
          </h2>
          <h2 className="post-comment-like">{comment?.likesCount} likes</h2>
          {/* <h2 className="post-comment-replies">{comment?.replyCount}Reply</h2> */}
        </div>
      </div>
    </div>
  );

  return <>{comment ? content : <Loader />}</>;
};

export default Comment;
