import apiSlice from "../api/apiSlice";

const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: ({ title, content }) => ({
        url: "api/note/create",
        method: "POST",
        body: {
          title,
          content,
        },
      }),
      invalidatesTags: ["Note"],
    }),
    getNotes: builder.query({
      query: ({ userId }) => `api/note/${userId}`,
      providesTags: ["Note"],
      transformResponse: (response) => {
        const notsReversed = [];
        response.forEach((note) => {
          notsReversed.unshift(note);
        });
        return notsReversed;
      },
    }),
    deleteNote: builder.mutation({
      query: ({ noteId }) => ({
        url: `api/note/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useGetNotesQuery,
  useDeleteNoteMutation,
} = noteApiSlice;
