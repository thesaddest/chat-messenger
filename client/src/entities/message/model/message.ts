import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import MessageService from "../api/message.service";
import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";
import { IUser } from "../../user";

import { IForwardMessagesPayload, IMessage } from "./interfaces";
import {
    setMessagesStateAfterReadStatusUpdate,
    setMessageStateAfterDeleteMessages,
    setReadMessagesStateWithUniqueValues,
} from "./helpers";

interface IReadMessagePayload {
    messages: IMessage[];
    user: IUser;
}

interface MessageState {
    messages: IMessage[] | null;
    isLoading: boolean;
    error: string | null;
    selectedMessages: IMessage[];
    readMessages: IMessage[];
    forwardedMessages: IMessage[];
    repliedMessage: IMessage | null;
}

const initialState: MessageState = {
    messages: null,
    isLoading: true,
    error: null,
    selectedMessages: [],
    readMessages: [],
    forwardedMessages: [],
    repliedMessage: null,
};

export const createMessage = (
    to: string,
    from: string,
    content: string,
    messageId?: string,
    isMessageSelected?: boolean,
    isMessageRead?: boolean,
    isMessageForwarded?: boolean,
): IMessage => {
    return {
        to: to,
        from: from,
        content: content,
        messageId: messageId !== undefined ? messageId : "",
        isMessageSelected: isMessageSelected !== undefined ? isMessageSelected : false,
        isMessageRead: isMessageRead !== undefined ? isMessageRead : false,
        isMessageForwarded: isMessageForwarded !== undefined ? isMessageForwarded : false,
    };
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

export const readMessages = createAsyncThunk<IMessage[], IReadMessagePayload, { rejectValue: string }>(
    "messages/readMessages",
    async function ({ messages, user }, { rejectWithValue }) {
        const messagesSentFromFriend = messages.filter((message) => message.from !== user.userId);
        if (messagesSentFromFriend.length === 0) {
            return rejectWithValue("No messages to read");
        }

        const messagesToRead = messagesSentFromFriend.filter(({ isMessageRead }) => !isMessageRead);
        if (messagesToRead.length === 0) {
            return rejectWithValue("No messages to read");
        }

        const { data } = await MessageService.readMessages(messagesToRead);

        if (!data) {
            return rejectWithValue("Error while reading messages");
        }

        socket.emit(SOCKET_EVENTS.READ_MESSAGES, data);
        return data;
    },
);

export const forwardMessages = createAsyncThunk<IMessage[], IForwardMessagesPayload, { rejectValue: string }>(
    "messages/forwardMessages",
    async function (forwardMessagesPayload, { rejectWithValue }) {
        const { data } = await MessageService.forwardMessages(forwardMessagesPayload);

        if (!data) {
            return rejectWithValue("Error while forwarding messages");
        }

        socket.emit(SOCKET_EVENTS.FORWARD_MESSAGES, data);
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
            state.readMessages = state.readMessages.filter(
                (messageInState) => messageInState.messageId !== action.payload.messageId,
            );

            state.forwardedMessages = state.forwardedMessages.filter(
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

            messageInState.isMessageSelected = false;
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
        getReadMessages: (state) => {
            if (!state.messages) {
                return;
            }
            state.readMessages = current(state.messages).filter(
                (messageInState) => messageInState.isMessageRead === true,
            );
        },
        readMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages || !state.readMessages) {
                return;
            }
            state.readMessages.push(action.payload);
            state.messages = state.messages.map((messageInState) =>
                messageInState.messageId === action.payload.messageId ? action.payload : messageInState,
            );
        },
        forwardMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }
            state.forwardedMessages.push(action.payload);
            state.messages.push(action.payload);
        },
        replyToMessage: (state, action: PayloadAction<IMessage>) => {
            state.repliedMessage = action.payload;
        },
        clearReplyToMessage: (state) => {
            state.repliedMessage = null;
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
                state.messages = setMessageStateAfterDeleteMessages(state.messages, action.payload);
                state.readMessages = setMessageStateAfterDeleteMessages(state.readMessages, action.payload);
                state.forwardedMessages = setMessageStateAfterDeleteMessages(state.forwardedMessages, action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteMessages.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(readMessages.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.readMessages = setReadMessagesStateWithUniqueValues(state.readMessages, action.payload);
                state.messages = setMessagesStateAfterReadStatusUpdate(state.messages, action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(readMessages.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(forwardMessages.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.forwardedMessages = state.forwardedMessages.concat(action.payload);
                state.messages = state.messages.concat(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(forwardMessages.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const {
    addMessage,
    deleteMessage,
    selectMessage,
    deselectMessage,
    deselectAllSelectedMessages,
    getReadMessages,
    readMessage,
    forwardMessage,
    replyToMessage,
    clearReplyToMessage,
} = messageModel.actions;

export const reducer = messageModel.reducer;
