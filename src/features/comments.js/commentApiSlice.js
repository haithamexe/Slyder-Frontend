import apiSlice from "../api/apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: (postId) => `comments?postId=${postId}`,
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: "comments",
        method: "POST",
        body: newComment,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, ...updatedComment }) => ({
        url: `comments/${id}`,
        method: "PUT",
        body: updatedComment,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
    }),
    getCommentByUserId: builder.query({
      query: (userId) => `comments?userId=${userId}`,
    }),
    getCommentsByPostId: builder.query({
      query: (postId) => `comments?postId=${postId}`,
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
