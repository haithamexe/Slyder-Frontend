import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
