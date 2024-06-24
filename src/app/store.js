// import tokenSlice from "../features/token/tokenSlice";
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import userSlice from "../features/user/userSlice";
import postSlice from "../features/post/postSlice";
import messageSlice from "../features/message/messageSlice";
import notificationReducer from "../features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    message: messageSlice,
    notifications: notificationReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
