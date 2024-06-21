// import tokenSlice from "../features/token/tokenSlice";
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import userSlice from "../features/user/userSlice";
import postSlice from "../features/post/postSlice";
import messageSlice from "../features/message/messageSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    message: messageSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
