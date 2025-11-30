import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateMessage: (state, action) => {
      const { messageId, updatedText } = action.payload;
      state.messages = state.messages.map((msg) =>
        msg._id === messageId ? { ...msg, message: updatedText } : msg
      );
    },
  },
});

export const { setMessages, updateMessage } = messageSlice.actions;
export default messageSlice.reducer;
