import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  onlineUsers: [],
  status: "idle",
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    deleteOnlineUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

export const { addMessage, clearMessages, setMessages, setOnlineUsers } =
  messageSlice.actions;

export const selectMessages = (state) => state.message.messages;
export const selectOnlineUsers = (state) => state.message.onlineUsers;

export default messageSlice.reducer;
