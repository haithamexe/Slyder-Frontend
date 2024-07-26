import apiSlice from "../api/apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: "api/post/create",
        method: "POST",
        body: {
          content: postData.content,
          image: postData.image,
          type: postData.type,
          userId: postData.userId,
        },
      }),
      invalidatesTags: [
        "Post",
        "HomePost",
        "TrendPost",
        "SavedPost",
        "UserPost",
      ],
    }),

    updatePost: builder.mutation({
      query: ({ postId, ...postData }) => ({
        url: `api/post/${postId}`,
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: (result, error, postId) => [
        { type: ["Post", "HomePost", "UserPost", "TrendPost"], id: postId },
      ],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `api/post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Post",
        "HomePost",
        "TrendPost",
        "SavedPost",
        "UserPost",
      ],
    }),

    getPosts: builder.query({
      query: () => "api/post/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post", id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPost: builder.query({
      query: (postId) => `api/post/${postId}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `api/post/${postId}/like`,
        method: "PUT",
        body: { userId },
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPost", postId, (draft) => {
            const like = { id: "temp-id", user: userId };
            if (!draft.likes.some((l) => l.user === userId)) {
              draft.likes.push(like);
            }
            console.log(draft, like);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        { type: "LikedPosts" },
      ],
    }),
    unlikePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `api/post/${postId}/unlike`,
        method: "PUT",
        body: { userId },
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPost", postId, (draft) => {
            draft.likes = draft.likes.filter((like) => like.user !== userId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        { type: "LikedPosts" },
      ],
    }),
    savePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `api/post/save/${postId}/${userId}`,
        method: "PUT",
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        console.log("running saved");
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPost", postId, (draft) => {
            const saved = { id: "temp-id", user: userId, postId };
            if (!draft.savedBy.some((s) => s.user === userId)) {
              draft.savedBy.push(saved);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: ["Post"], id: postId },
        { type: "SavedPosts" },
      ],
    }),
    unsavePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `api/post/save/${postId}/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPost", postId, (draft) => {
            draft.savedBy = draft.savedBy.filter(
              (saved) => saved.user !== userId
            );
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        { type: "SavedPosts" },
      ],
    }),
    commentPost: builder.mutation({
      query: ({ postId, comment, userId }) => ({
        url: `api/post/${postId}/comment`,
        method: "PUT",
        body: { userId, comment },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
    uncommentPost: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `api/post/${postId}/uncomment`,
        method: "PUT",
        body: { commentId },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
    getPostsByUserName: builder.query({
      query: (userName) => `api/post/user/${userName}`,
      providesTags: ["UserPost"],
      invalidatesTags: ["UserPost"],
    }),
    getPostComments: builder.query({
      query: ({ postId }) => `api/post/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: "PostComment", id: postId },
      ],
    }),
    getSavedPostsByUser: builder.query({
      query: (userId) => `api/post/saved/${userId}`,
      providesTags: ["SavedPosts"],
    }),
    getHomePosts: builder.query({
      query: (userId) => `api/post/home/${userId}`,
      providesTags: ["HomePost"],
    }),
    getTrendPosts: builder.query({
      query: () => "api/post/trend",
      providesTags: ["TrendPost"],
    }),
    getSavedPosts: builder.query({
      query: ({ userId }) => `api/post/saved/user/${userId}`,
      providesTags: ["SavedPosts"],
    }),
    getPostById: builder.query({
      query: ({ postId }) => `api/post/${postId}`,
    }),
    getPostCommentById: builder.query({
      query: ({ commentId }) => ({
        url: `api/post/comment/${commentId}`,
      }),
      providesTags: (result, error, commentId) => [
        { type: "PostCommentById", id: commentId },
      ],
    }),
    getPostSaved: builder.query({
      query: ({ postId, userId }) => `api/post/saved/${postId}/${userId}`,
      providesTags: (result, error, postId) => [
        { type: "SavedPost", id: postId },
      ],
    }),
    getLikedPosts: builder.query({
      query: ({ userId }) => `api/post/userLiked/${userId}`,
      providesTags: ["LikedPosts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useUncommentPostMutation,
  useGetPostsByFollowingQuery,
  useSavePostMutation,
  useUnsavePostMutation,
  useGetPostLikesQuery,
  useGetPostCommentsQuery,
  useGetHomePostsQuery,
  useGetTrendPostsQuery,
  useGetSavedPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserNameQuery,
  useGetPostCommentByIdQuery,
  useGetPostSavedQuery,
  useGetLikedPostsQuery,
} = postApiSlice;

export default postApiSlice;
