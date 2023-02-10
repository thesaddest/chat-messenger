import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import MessageService from "../api/message.service";
import { IFriend } from "../../friend";
import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";

import { IMessage } from "./interfaces";

interface MessageState {
    messages: IMessage[] | null;
    isLoading: boolean;
    error: string | null;
    selectedMessages: IMessage[];
}

const initialState: MessageState = {
    messages: null,
    isLoading: true,
    error: null,
    selectedMessages: [],
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
            const { data } = await MessageService.sendMessage(messageData);
            socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
            return data;
        } catch (e) {
            return rejectWithValue("Error while sending message");
        }
    },
);

export const getMessages = createAsyncThunk<IMessage[], undefined, { rejectValue: string }>(
    "messages/getMessages",
    async function (_, { rejectWithValue }) {
        const { data } = await MessageService.getMessages();

        if (!data) {
            return rejectWithValue("Error while getting messages");
        }

        return data;
    },
);

export const deleteMessages = createAsyncThunk<IMessage[], IMessage[], { rejectValue: string }>(
    "messages/deleteMessages",
    async function (messages, { rejectWithValue }) {
        const { data } = await MessageService.deleteMessages(messages);

        if (!data) {
            return rejectWithValue("Error while deleting messages");
        }

        socket.emit(SOCKET_EVENTS.DELETE_MESSAGES, data);
        return data;
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
        deleteMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }
            state.messages = state.messages.filter(
                (messageInState) => messageInState.messageId !== action.payload.messageId,
            );
        },
        selectMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }

            const messageInState = state.messages.find(
                (messageInState) => messageInState.messageId === action.payload.messageId,
            );

            if (!messageInState) {
                return;
            }

            messageInState.isMessageSelected = action.payload.isMessageSelected;
            state.selectedMessages.push(action.payload);
        },
        deselectMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }

            const messageInState = state.messages.find(
                (messageInState) => messageInState.messageId === action.payload.messageId,
            );

            if (!messageInState) {
                return;
            }

            messageInState.isMessageSelected = action.payload.isMessageSelected;
            state.selectedMessages = state.selectedMessages.filter(
                (messageInState) => messageInState.messageId !== action.payload.messageId,
            );
        },
        deselectAllSelectedMessages: (state, action: PayloadAction<IMessage[]>) => {
            if (!state.messages) {
                return;
            }
            for (const messageInState of state.messages) {
                for (const messageInPayload of action.payload) {
                    if (messageInState.messageId === messageInPayload.messageId) {
                        messageInState.isMessageSelected = false;
                    }
                }
            }
            state.selectedMessages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getMessages.pending, (state) => {
                state.messages = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMessages.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.messages = null;
                state.isLoading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.messages.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteMessages.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.messages = state.messages.filter(
                    (messageInState) =>
                        !action.payload.some(
                            (messageInPayload) => messageInPayload.messageId === messageInState.messageId,
                        ),
                );
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteMessages.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { addMessage, deleteMessage, selectMessage, deselectMessage, deselectAllSelectedMessages } =
    messageModel.actions;

export const reducer = messageModel.reducer;
