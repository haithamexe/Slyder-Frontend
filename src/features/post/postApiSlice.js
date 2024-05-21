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
    }),
    getPosts: builder.query({
      query: () => "api/post",
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
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `api/post/${postId}`,
        method: "DELETE",
      }),
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `api/post/${postId}/like`,
        method: "PUT",
      }),
    }),
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `api/post/${postId}/unlike`,
        method: "PUT",
      }),
    }),
    commentPost: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `api/post/${postId}/comment`,
        method: "PUT",
        body: { comment },
      }),
    }),
    uncommentPost: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `api/post/${postId}/uncomment`,
        method: "PUT",
        body: { commentId },
      }),
    }),
    getPostsByUser: builder.query({
      query: (userId) => `api/post/user/${userId}`,
    }),
    getPostsByFollowing: builder.query({
      query: () => "api/post/following",
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
      query: (postId) => `api/post/${postId}/likes`,
    }),
    getPostComments: builder.query({
      query: (postId) => `api/post/${postId}/comments`,
    }),
    getSavedPostsByUser: builder.query({
      query: (userId) => `api/post/saved/${userId}`,
    }),
    getHomePosts: builder.query({
      query: (userId) => `api/post/home/${userId}`,
    }),
    getTrendPosts: builder.query({
      query: () => "api/post/trend",
    }),
    getSavedPosts: builder.query({
      query: () => "api/post/saved",
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
  useGetPostsByUserQuery,
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
} = postApiSlice;

export default postApiSlice;
