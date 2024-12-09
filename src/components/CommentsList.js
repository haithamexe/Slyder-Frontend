import Comment from "./Comment";
import { useGetPostCommentsQuery } from "../features/post/postApiSlice";
import { useEffect, useState } from "react";
const CommentsList = ({
  postId,
  setCommentsCount,
  setFetchPostId,
  comments,
}) => {
  return (
    <>
      {comments?.map((comment) => (
        <Comment
          comment={comment}
          key={comment._id}
          setFetchPostId={setFetchPostId}
        />
      ))}
    </>
  );
};

export default CommentsList;
