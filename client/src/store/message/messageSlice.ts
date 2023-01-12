import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMessage } from "../../api/interfaces";

interface MessageState {
    messages: IMessage[];
}

const initialState: MessageState = {
    messages: [],
};

const messageSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        getAllMessages(state, action: PayloadAction<IMessage[]>) {
            state.messages = action.payload;
        },
        sendMessage(state, action: PayloadAction<IMessage>) {
            state.messages.push(action.payload);
        },
    },
});

export const { getAllMessages, sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
