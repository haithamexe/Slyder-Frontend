import { createSlice } from "@reduxjs/toolkit";
import userApiSlice from "./userApiSlice";

const initialState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    activateUser: (state, action) => {
      state.accessToken = action.payload;
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logoutUser: (state, action) => {
      return initialState;
    },
    authUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearToken: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.loginUserApi.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );

    builder.addMatcher(
      userApiSlice.endpoints.loginUserApi.matchRejected,
      (state, action) => {
        state.accessToken = null;
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.registerUserApi.matchFulfilled,
      (state, action) => {
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.registerUserApi.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.activateUserApi.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.activateUserApi.matchRejected,
      (state, action) => {
        state.accessToken = null;
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.refreshTokenApi.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.refreshTokenApi.matchRejected,
      (state, action) => {
        state.accessToken = null;
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.logoutUserApi.matchFulfilled,
      (state, action) => {
        state.accessToken = null;
        state.user = null;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.logoutUserApi.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.forgotPasswordApi.matchFulfilled,
      (state, action) => {
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.forgotPasswordApi.matchRejected,
      (state, action) => {
        state.accessToken = null;
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.authUserApi.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.authUserApi.matchRejected,
      (state, action) => {
        state.user = null;
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.refreshActivationTokenApi.matchFulfilled,
      (state, action) => {
        state.status = "fulfilled";
        state.error = null;
      }
    );

    builder.addMatcher(
      userApiSlice.endpoints.refreshActivationTokenApi.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.getUserWithIdApi.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.getUserWithIdApi.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.getUserWithUsernameApi.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
        state.error = null;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.getUserWithUsernameApi.matchRejected,
      (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      }
    );
  },
});

export const userAuthToken = (state) => state.user.accessToken;
export const userAuthStatus = (state) => state.user.status;
export const userAuthError = (state) => state.user.error;
export const userAuthed = (state) => state.user.user;

export const { actions: userActions } = userSlice;

export default userSlice.reducer;
