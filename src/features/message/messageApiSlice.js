import apiSlice from "../api/apiSlice";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "api/message/create",
        method: "POST",
        body: {
          message: messageData.content,
          senderId: messageData.senderId,
        },
      }),
      invalidatesTags: ["Message"],
    }),
    getMessages: builder.query({
      query: (receiverId) => `api/message/${receiverId}`,
      providesTags: ["Message"],
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `api/message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
    getConversation: builder.query({
      query: ({ receiverId }) => `api/message/conversation/${receiverId}`,
      providesTags: (result, error, { receiverId }) => [
        { type: "Conversation", id: receiverId },
      ],
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
