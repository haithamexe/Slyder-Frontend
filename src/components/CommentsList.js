import Comment from "./Comment";
import Loader from "./Loader";
import { useGetPostCommentsQuery } from "../features/post/postApiSlice";
import { useEffect, useState } from "react";
const CommentsList = ({ postId, setCommentsCount }) => {
  const { data, isSuccess } = useGetPostCommentsQuery({ postId });
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setComments(data);
      setCommentsCount(data.length);
    }
  }, [data, isSuccess]);
  return (
    <>
      {comments?.map((comment) => (
        <Comment key={comment} commentId={comment} />
      ))}
    </>
  );
};

export default CommentsList;
