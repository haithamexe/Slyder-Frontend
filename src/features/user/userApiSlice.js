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
      query: ({ userId }) => `api/user/${userId}`,
      providesTags: (result, error, { userId }) => [
        { type: "UserWithId", id: userId },
      ],
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
      invalidatesTags: (result, error, { userId }) => [
        { type: "UserWithId", id: userId },
        { type: ["User, HomePost", "UserPost", "TrendPost", "Post"] },
      ],
    }),
    getFollowersApi: builder.query({
      query: ({ userId }) => `api/user/followers/${userId}`,
      providesTags: ["Followers"],
    }),
    getFollowingApi: builder.query({
      query: ({ userId }) => `api/user/following/${userId}`,
      providesTags: ["Following"],
    }),
    followUserApi: builder.mutation({
      query: ({ userId, followId }) => ({
        url: `api/user/follow/${userId}`,
        method: "PUT",
        body: { followId },
      }),
      invalidatesTags: ["Followers", "Following", "HomePost", "Contacts"],
    }),
    unFollowUserApi: builder.mutation({
      query: ({ userId, unFollowId }) => ({
        url: `api/user/unfollow/${userId}`,
        method: "PUT",
        body: { unFollowId },
      }),
      invalidatesTags: ["Following", "Followers", "HomePost", "Contacts"],
    }),
    getUserContactsApi: builder.query({
      query: ({ userId }) => `api/user/contacts/${userId}`,
      providesTags: ["Contacts"],
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
  useGetFollowersApiQuery,
  useGetFollowingApiQuery,
  useFollowUserApiMutation,
  useUnFollowUserApiMutation,
  useGetUserContactsApiQuery,
} = userApiSlice;

export default userApiSlice;
