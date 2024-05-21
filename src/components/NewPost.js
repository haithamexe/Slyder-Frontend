import "../styles/newPost.css";

import { useState, useRef, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { useDispatch } from "react-redux";
// import { createPost } from "../redux/actions/post";
import { useCreatePostMutation } from "../features/post/postApiSlice";
import { postActions } from "../features/post/postSlice";
import Resizer from "react-image-file-resizer";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const [submitError, setSubmitError] = useState(null);
const NewPost = ({ newPost, setNewPost, place, refetchPosts }) => {
  const navigate = useNavigate();
  const [newPostData, setNewPostData] = useState({
    content: "",
    image: "",
    type: "",
  }); // [new
  const fileRef = useRef();
  const user = useSelector(userAuthed);
  const dispatch = useDispatch();
  const [createPostApi, { data, error, isLoading, isSuccess }] =
    useCreatePostMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        Resizer.imageFileResizer(
          file,
          1920, // max width
          1920, // max height
          "JPEG", // compress format
          60, // quality
          0, // rotation
          (uri) => {
            setNewPostData({ ...newPostData, image: uri });
          },
          "base64" // output type
        );
      } catch (err) {
        console.error("Error resizing the image:", err);
      }
    }
  };

  const handlePost = () => {
    if (newPostData.content || newPostData.image) {
      createPostApi({
        content: newPostData.content,
        image: newPostData.image,
        type: newPostData.type,
        userId: user.id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(postActions.addPost(data));
      console.log(data, "data");
      if (place === "profile") {
        // navigate("/" + user.username);
        refetchPosts();
      }
      setNewPostData({ content: "", image: "", type: "" });
      setNewPost(false);
    }
  }, [isSuccess]);

  return (
    <div className={newPost ? "new-post active" : "new-post"}>
      <div className="new-post-container">
        <div className="new-post-header">
          <h1>Create a new post</h1>
          <CloseRoundedIcon
            onClick={() => setNewPost(false)}
            sx={{
              fontSize: 24,
              color: "#a7c750;",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="new-post-body">
          <textarea
            placeholder="What's on your mind?"
            className="new-post-textarea"
            onChange={(e) =>
              setNewPostData({ ...newPostData, content: e.target.value })
            }
            value={newPostData.content}
          ></textarea>
          {newPostData.image && (
            <div className="new-post-img">
              <img src={newPostData.image} alt="post" />
              <CloseRoundedIcon
                className="new-post-img-close"
                onClick={() => setNewPostData({ ...newPostData, image: "" })}
                sx={{
                  fontSize: 30,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />
            </div>
          )}
          <div className="post-options inNewPost">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-photo"
              ref={fileRef}
              onChange={handleFileChange}
            />
            <div
              className="post-option"
              onClick={() => fileRef.current.click()}
            >
              <PhotoLibraryRoundedIcon
                sx={{
                  fontSize: 20,
                  color: "#a7c750;",
                  cursor: "pointer",
                }}
              />

              <h1>Photo</h1>
            </div>
            {/* <button className="post-option">
              <PollRoundedIcon
                sx={{
                  fontSize: 20,
                  color: "#a7c750;",
                }}
              />
              <h1>Poll</h1>
            </button> */}
            {/* <button className="post-option">
              <LibraryMusicRoundedIcon
                sx={{
                  fontSize: 20,
                  color: "#a7c750;",
                }}
              />
              <h1>Music</h1>
            </button> */}
          </div>
          <div className="new-post-footer-type">
            <h1>Type</h1>
            <select
              type=""
              className="new-post-type"
              onChange={(e) =>
                setNewPostData({ ...newPostData, type: e.target.value })
              }
            >
              <option value="">Type</option>
              <option value="news">News</option>
              <option value="sport">Sport</option>
              <option value="entertanment">Entertainment</option>
              <option value="politics">Politics</option>
              <option value="technology">Technology</option>
              <option value="fashion">Fashion</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
            <p>
              choosing a type will qualify your post to be recommended to
              others, missuse of this feature will result in a ban.
            </p>
          </div>
        </div>
        <div className="new-post-footer">
          <button
            type="button"
            className="new-post-button"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
