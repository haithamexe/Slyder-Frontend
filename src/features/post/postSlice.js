import { createSlice } from "@reduxjs/toolkit";
import postApiSlice from "./postApiSlice";

const initialState = {
  posts: [],
  homePosts: [],
  trendPosts: [],
  savedPosts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setUserPosts: (state, action) => {
      state.posts = action.payload;
    },
    setTrendPosts: (state, action) => {
      state.trendPosts = action.payload;
    },
    clearPost: (state) => {
      state.posts = null;
    },
    addProfilePost: (state, action) => {
      state.posts.push(action.payload);
    },
    addPost: (state, action) => {
      state.homePosts.push(action.payload);
    },
    setHomePosts: (state, action) => {
      state.homePosts = action.payload;
    },
    setSavedPosts: (state, action) => {
      state.savedPosts = action.payload;
    },
    addSavedPost: (state, action) => {
      state.savedPosts.push(action.payload);
    },
    removeSavedPost: (state, action) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.id !== action.payload.id
      );
    },
    removeHomePost: (state, action) => {
      state.homePosts = state.homePosts.filter(
        (postId) => postId !== action.payload.id
      );
    },
    removeUserPost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    deletePost: (state, action) => {
      state.homePosts = state.homePosts.filter(
        (post) => post.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postApiSlice.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        state.posts = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getPosts.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getPost.matchFulfilled,
      (state, action) => {
        state.post = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getPost.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.createPost.matchFulfilled,
      (state, action) => {
        state.posts.push(action.payload);
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.createPost.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.updatePost.matchFulfilled,
      (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.updatePost.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.deletePost.matchFulfilled,
      (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.deletePost.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getTrendPosts.matchFulfilled,
      (state, action) => {
        state.trendPosts = action.payload;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getSavedPosts.matchFulfilled,
      (state, action) => {
        state.savedPosts = action.payload;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getPostById.matchFulfilled,
      (state, action) => {
        state.post = action.payload;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getHomePosts.matchFulfilled,
      (state, action) => {
        state.homePosts = action.payload;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getPostById.matchFulfilled,
      (state, action) => {
        state.post = action.payload;
      }
    );
    builder.addMatcher(
      postApiSlice.endpoints.getPostById.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );

    // builder.addMatcher(
    //   postApiSlice.endpoints.getHomePosts.matchFulfilled,
    //   (state, action) => {
    //     state.homePosts = action.payload;
    //   }
    // );
    // builder.addMatcher(
    //   postApiSlice.endpoints.getHomePosts.matchRejected,
    //   (state, action) => {
    //     state.status = "rejected";
    //     state.error = action.error.message;
    //   }
    // );
  },
});

export const postStatus = (state) => state.post.status;
export const postError = (state) => state.post.error;
export const homePosts = (state) => state.post.homePosts;
export const trendPosts = (state) => state.post.trendPosts;
export const savedPosts = (state) => state.post.savedPosts;
export const userPosts = (state) => state.post.posts;
// export const singlePost = (state) => state.post.post;

export const { actions: postActions } = postSlice;

export default postSlice.reducer;
