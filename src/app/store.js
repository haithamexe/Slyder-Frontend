// import tokenSlice from "../features/token/tokenSlice";
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
