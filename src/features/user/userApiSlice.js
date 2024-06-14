import apiSlice from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUserApi: builder.mutation({
      query: (userData) => ({
        url: "api/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUserApi: builder.mutation({
      query: (userData) => ({
        url: "api/user/login",
        method: "POST",
        body: userData,
      }),
      providesTags: ["Token"],
    }),
    activateUserApi: builder.mutation({
      query: (token) => ({
        url: "api/user/activate",
        method: "POST",
        body: { token: token },
      }),
      providesTags: ["Token"],
    }),
    authUserApi: builder.mutation({
      query: (accessToken) => ({
        url: "api/user/auth",
        method: "POST",
        body: accessToken,
      }),
      providesTags: ["User"],
    }),
    refreshTokenApi: builder.mutation({
      query: () => ({
        url: "api/user/refresh",
        method: "POST",
      }),
      invalidatesTags: ["Token", "User"],
    }),
    forgotPasswordApi: builder.mutation({
      query: (email) => ({
        url: "api/user/forgotPassword",
        method: "POST",
        body: email,
      }),
    }),
    logoutUserApi: builder.mutation({
      query: () => ({
        url: "api/user/logout",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Token", "User"],
    }),
    refreshActivationTokenApi: builder.mutation({
      query: (email) => ({
        url: "api/user/refreshActivation",
        method: "POST",
        body: { email: email },
      }),
    }),
    getUserWithIdApi: builder.query({
      query: (userId) => `api/user/${userId}`,
      providesTags: ["UserWithId"],
    }),

    getUserWithUsernameApi: builder.query({
      query: (username) => `api/user/username/${username}`,
    }),
    updateUserApi: builder.mutation({
      query: ({ userData, userId }) => ({
        url: "api/user/update/" + userId,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: [
        "User",
        "Post",
        "HomePost",
        "UserPost",
        "TrendPost",
        "UserWithId",
      ],
    }),
  }),
});

export const {
  useRegisterUserApiMutation,
  useLoginUserApiMutation,
  useActivateUserApiMutation,
  useAuthUserApiMutation,
  useRefreshTokenApiMutation,
  useForgotPasswordApiMutation,
  useLogoutUserApiMutation,
  useRefreshActivationTokenApiMutation,
  useGetUserWithIdApiQuery,
  useGetUserWithUsernameApiQuery,
  useUpdateUserApiMutation,
} = userApiSlice;

export default userApiSlice;
