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
    getPosts: builder.query({
      query: () => "api/post",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (postId) => `api/post/${postId}`,
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
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `api/post/${postId}/like`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: (result, error, postId) => [
        { type: ["PostLike"], id: postId },
      ],
    }),
    unlikePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `api/post/${postId}/unlike`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: (result, error, postId) => [
        { type: ["PostLike"], id: postId },
      ],
    }),
    commentPost: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `api/post/${postId}/comment`,
        method: "PUT",
        body: { comment },
      }),
      invalidatesTags: (result, error, postId) => [
        { type: ["PostComment"], id: postId },
      ],
    }),
    uncommentPost: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `api/post/${postId}/uncomment`,
        method: "PUT",
        body: { commentId },
      }),
      invalidatesTags: (result, error, postId) => [
        { type: ["PostComment"], id: postId },
      ],
    }),
    getPostsByUserName: builder.query({
      query: (userName) => `api/post/user/${userName}`,
      providesTags: ["UserPost"],
    }),
    savePost: builder.mutation({
      query: (postId) => ({
        url: `api/post/${postId}/save`,
        method: "PUT",
      }),
    }),
    unsavePost: builder.mutation({
      query: (postId) => ({
        url: `api/post/${postId}/unsave`,
        method: "PUT",
      }),
    }),
    getPostLikes: builder.query({
      query: ({ postId, userId }) => `api/post/${postId}/likes/${userId}`,
      providesTags: (result, error, postId) => [
        { type: "PostLike", id: postId },
      ],
    }),
    getPostComments: builder.query({
      query: (postId) => `api/post/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: "PostComment", id: postId },
      ],
    }),
    getSavedPostsByUser: builder.query({
      query: (userId) => `api/post/saved/${userId}`,
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
      query: () => "api/post/saved",
      providesTags: ["SavedPost"],
    }),

    getPostById: builder.query({
      query: (postId) => `api/post/${postId}`,
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
  useGetSavedPostsByUserQuery,
  useGetHomePostsQuery,
  useGetTrendPostsQuery,
  useGetSavedPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserNameQuery,
} = postApiSlice;

export default postApiSlice;
