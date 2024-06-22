import apiSlice from "../api/apiSlice";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: ({ receiverId, message }) => ({
        url: `api/message/create/${receiverId}`,
        method: "POST",
        body: {
          message,
        },
      }),
      // invalidatesTags: ["Message", "Conversation"],
      invalidatesTags: ["Conversation"],
    }),
    getMessages: builder.query({
      query: ({ receiverId }) => `api/message/${receiverId}`,
      providesTags: ["Message", "Conversation"],
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `api/message/${messageId}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Message", "Conversation"],
      invalidatesTags: ["Conversation"],
    }),
    getConversation: builder.query({
      query: ({ receiverId }) => `api/message/conversation/${receiverId}`,
      providesTags: ["Conversation"],
    }),
    createConversation: builder.mutation({
      query: ({ receiverId }) => ({
        url: `api/message/conversation/${receiverId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { receiverId }) => [
        { type: "Conversation", id: receiverId },
        { type: "Conversation" },
      ],
    }),
    deleteConversation: builder.mutation({
      query: ({ receiverId }) => ({
        url: `api/message/conversation/${receiverId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { receiverId }) => [
        { type: "Conversation", id: receiverId },
        { type: "Conversation" },
      ],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
  useGetConversationQuery,
  useCreateConversationMutation,
  useDeleteConversationMutation,
} = messageApiSlice;

export default messageApiSlice.reducer;
