import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      state = [];
    },
    clearNotifications: () => [],
  },
});

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

export const selectNotifications = (state) => state.notifications;

export default notificationSlice.reducer;
