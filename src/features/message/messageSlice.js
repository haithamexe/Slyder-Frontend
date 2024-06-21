import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
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
  },
});

export const { addMessage, clearMessages, setMessages } = messageSlice.actions;

export const selectMessages = (state) => state.message.messages;

export default messageSlice.reducer;
