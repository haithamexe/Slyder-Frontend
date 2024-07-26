import Comment from "./Comment";
import { useGetPostCommentsQuery } from "../features/post/postApiSlice";
import { useEffect, useState } from "react";
const CommentsList = ({ postId, setCommentsCount, setFetchPostId }) => {
  const { data, isSuccess } = useGetPostCommentsQuery({ postId });
  const [comments, setComments] = useState(null);

  return (
    <>
      {data?.map((comment) => (
        <Comment
          key={comment}
          commentId={comment}
          setFetchPostId={setFetchPostId}
        />
      ))}
    </>
  );
};

export default CommentsList;
