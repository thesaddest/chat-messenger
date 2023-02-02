import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import MessageService from "../api/message.service";
import { IFriend } from "../../friend";
import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";

import { IMessage } from "./interfaces";

interface MessageState {
    messages: IMessage[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    messages: null,
    loading: true,
    error: null,
};

export const filterMessageBySender = (messages: IMessage[], friend: IFriend): IMessage[] => {
    return messages.filter(
        (message) => message.to === friend.userBehindFriend || message.from === friend.userBehindFriend,
    );
};

export const getLastMessageBySender = (messages: IMessage[], friend: IFriend): IMessage => {
    const filteredMessages = filterMessageBySender(messages, friend);
    return filteredMessages[filteredMessages.length - 1];
};

export const sendMessage = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>(
    "messages/sendMessage",
    async function (messageData, { rejectWithValue }) {
        try {
            socket.emit(SOCKET_EVENTS.SEND_MESSAGE, messageData);
            const { data } = await MessageService.sendMessage(messageData);

            return data;
        } catch (e) {
            return rejectWithValue("Error while sending message");
        }
    },
);

export const getMessages = createAsyncThunk<IMessage[], undefined, { rejectValue: string }>(
    "messages/getMessages",
    async function (_, { rejectWithValue }) {
        const response = await MessageService.getMessages();

        if (!response.data) {
            return rejectWithValue("Error while getting messages");
        }

        return response.data;
    },
);

export const messageModel = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getMessages.pending, (state) => {
                state.messages = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessages.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.messages = null;
                state.loading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.messages.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { addMessage } = messageModel.actions;

export const reducer = messageModel.reducer;
