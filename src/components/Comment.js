import { useGetPostCommentByIdQuery } from "../features/post/postApiSlice";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import Loader from "./Loader";

const Comment = ({ commentId }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: commentFetched, isSuccess: isCommentFetchSuccess } =
    useGetPostCommentByIdQuery({ commentId });

  useEffect(() => {
    if (isCommentFetchSuccess) {
      setComment(commentFetched);
      setLoading(false);
    }
  }, [commentId, isCommentFetchSuccess, commentFetched]);

  const content = (
    <div className="comment-individual">
      <div className="post-comment-user-img">
        <img src={comment?.user.picture} alt="user" />
      </div>
      <div className="post-comment-container-parts">
        <div className="post-comment-container-partI">
          {/* <div className="post-comment-user-info"> */}
          <h1 className="post-comment-user-name">
            <span className="comment-username">{comment?.user.username}</span>{" "}
            {comment?.content}
          </h1>
          {/* </div> */}
          {/* <div className="post-comment-likes">{comment?.likes.length} likes</div> */}
        </div>
        <div className="post-comment-container-interactive">
          <h2 className="post-comment-date">
            {comment && formatTimeAgo(comment?.createdAt)}
          </h2>
          <h2 className="post-comment-like">{comment?.likesCount} likes</h2>
          {/* <h2 className="post-comment-replies">{comment?.replyCount}Reply</h2> */}
        </div>
      </div>
    </div>
  );

  return (
    // <div className="comment-individual">
    //   <div className="post-comment-user-img">
    //     <img src={comment?.user.picture} alt="user" />
    //   </div>
    //   <div className="post-comment-container-parts">
    //     <div className="post-comment-container-partI">
    //       {/* <div className="post-comment-user-info"> */}
    //       <h1 className="post-comment-user-name">
    //         <span className="comment-username">{comment?.user.username}</span>{" "}
    //         {comment?.content}
    //       </h1>
    //       {/* </div> */}
    //       {/* <div className="post-comment-likes">{comment?.likes.length} likes</div> */}
    //     </div>
    //     <div className="post-comment-container-interactive">
    //       <h2 className="post-comment-date">
    //         {comment && formatTimeAgo(comment?.createdAt)}
    //       </h2>
    //       <h2 className="post-comment-like">{comment?.likesCount} likes</h2>
    //       {/* <h2 className="post-comment-replies">{comment?.replyCount}Reply</h2> */}
    //     </div>
    //   </div>
    // </div>
    <>{loading ? <Loader /> : content}</>
  );
};

export default Comment;
