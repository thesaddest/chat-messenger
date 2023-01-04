import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMessage } from "../../api/interfaces";

interface MessageState {
    messages: IMessage[];
}

const initialState: MessageState = {
    messages: [
        {
            to: "someId",
            from: "someFriendId",
            content: "hey, test",
        },
        {
            to: "someId",
            from: "someFriendId",
            content: "heeeeeyyyyy, some ",
        },
        {
            to: "someId",
            from: "someFriendId",
            content: "hello, note",
        },
    ],
};

const messageSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        getAllMessages(state, action: PayloadAction<IMessage[]>) {
            state.messages = action.payload;
        },
        sendMessage(state, action: PayloadAction<IMessage>) {
            state.messages?.push(action.payload);
        },
    },
});

export const { getAllMessages, sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
