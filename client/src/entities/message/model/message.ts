import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import MessageService from "../api/message.service";
import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";
import { IUser } from "../../user";
import { IFile } from "../../file";
import { MESSAGE_API } from "../api/api.constants";

import { IForwardMessagesPayload, IMessage, IReplyToMessagePayload } from "./interfaces";
import {
    setMessagesStateAfterReadStatusUpdate,
    setMessageStateAfterDeleteMessages,
    setMessagesStateWithUniqueValues,
    setMessageStateWithUniqueValue,
    deleteMessageFromState,
} from "./helpers";

interface IReadMessagePayload {
    messages: IMessage[];
    user: IUser;
}

interface ISendMessageWithAttachedFilesPayload {
    newMessage: IMessage;
    uploadedFiles: IFile[];
}

interface MessageState {
    messages: IMessage[] | null;
    isLoading: boolean;
    error: string | null;
    selectedMessages: IMessage[];
    readMessages: IMessage[];
    forwardedMessages: IMessage[];
    selectedMessageToReply: IMessage | null;
    repliedMessages: IMessage[];
}

const initialState: MessageState = {
    messages: null,
    isLoading: true,
    error: null,
    selectedMessages: [],
    readMessages: [],
    forwardedMessages: [],
    selectedMessageToReply: null,
    repliedMessages: [],
};

export const createMessage = (message: IMessage): IMessage => {
    return {
        to: message.to,
        from: message.from,
        fromUsername: message.fromUsername !== undefined ? message.fromUsername : "",
        content: message.content !== undefined ? message.content : "",
        messageId: message.messageId !== undefined ? message.messageId : undefined,
        isMessageSelected: message.isMessageSelected !== undefined ? message.isMessageSelected : false,
        isMessageRead: message.isMessageRead !== undefined ? message.isMessageRead : false,
        isMessageForwarded: message.isMessageForwarded !== undefined ? message.isMessageForwarded : false,
        prevMessageContent: message.prevMessageContent !== undefined ? message.prevMessageContent : undefined,
        prevMessageFrom: message.prevMessageFrom !== undefined ? message.prevMessageFrom : undefined,
        isGroupMessage: message.isGroupMessage !== undefined ? message.isGroupMessage : undefined,
        isHiddenMessage: message.isHiddenMessage !== undefined ? message.isHiddenMessage : undefined,
        hiddenS3Location: message.hiddenS3Location !== undefined ? message.hiddenS3Location : undefined,
        attachedFilesToUpload: message.attachedFilesToUpload !== undefined ? message.attachedFilesToUpload : undefined,
        attachedFilesAfterUpload:
            message.attachedFilesAfterUpload !== undefined ? message.attachedFilesAfterUpload : undefined,
    };
};

export const sendMessage = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>(
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.SEND_MESSAGE}`,
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
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.ALL_MESSAGES}`,
    async function (_, { rejectWithValue }) {
        const { data } = await MessageService.getMessages();

        if (!data) {
            return rejectWithValue("Error while getting messages");
        }

        return data;
    },
);

export const deleteMessages = createAsyncThunk<IMessage[], IMessage[], { rejectValue: string }>(
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.DELETE_MESSAGES}`,
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
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.READ_MESSAGES}`,
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
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.FORWARD_MESSAGES}`,
    async function (forwardMessagesPayload, { rejectWithValue }) {
        const { data } = await MessageService.forwardMessages(forwardMessagesPayload);

        if (!data) {
            return rejectWithValue("Error while forwarding messages");
        }

        socket.emit(SOCKET_EVENTS.FORWARD_MESSAGES, data);
        return data;
    },
);

export const replyToMessage = createAsyncThunk<IMessage, IReplyToMessagePayload, { rejectValue: string }>(
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.REPLY_TO_MESSAGE}`,
    async function (repliedMessagePayload, { rejectWithValue }) {
        const { data } = await MessageService.replyToMessage(repliedMessagePayload);

        if (!data) {
            return rejectWithValue("Error while replying to message");
        }

        socket.emit(SOCKET_EVENTS.REPLY_TO_MESSAGE, data);
        return data;
    },
);

export const sendMessageWithAttachedFiles = createAsyncThunk<
    IMessage,
    ISendMessageWithAttachedFilesPayload,
    { rejectValue: string }
>(
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.SEND_MESSAGE}-with-attached-file`,
    async function (messageWithAttachedFilesPayload, { rejectWithValue }) {
        const messageToSend = createMessage({
            to: messageWithAttachedFilesPayload.newMessage.to,
            from: messageWithAttachedFilesPayload.newMessage.from,
            content: messageWithAttachedFilesPayload.newMessage.content,
            attachedFilesAfterUpload: messageWithAttachedFilesPayload.uploadedFiles,
        });
        const { data } = await MessageService.sendMessage(messageToSend);

        if (!data) {
            return rejectWithValue("Error while sending message with attached files");
        }

        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
        return data;
    },
);

export const sendHiddenMessage = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>(
    `${MESSAGE_API.ENTITY}/hidden-${MESSAGE_API.SEND_MESSAGE}`,
    async function (message, { rejectWithValue }) {
        const messageToSend = createMessage({
            to: message.to,
            from: message.from,
            content: message.content,
            isHiddenMessage: true,
        });
        const { data } = await MessageService.hideMessage(messageToSend);

        if (!data) {
            return rejectWithValue("Error while hiding message");
        }

        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
        return data;
    },
);

export const revealHiddenMessage = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>(
    `${MESSAGE_API.ENTITY}/${MESSAGE_API.REVEAL_HIDDEN_MESSAGE}`,
    async function (message, { rejectWithValue }) {
        try {
            const { data } = await MessageService.revealHiddenMessage(message);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const messageModel = createSlice({
    name: `${MESSAGE_API.ENTITY}`,
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
            state.messages = deleteMessageFromState(state.messages, action.payload);
            state.readMessages = deleteMessageFromState(state.readMessages, action.payload);
            state.forwardedMessages = deleteMessageFromState(state.forwardedMessages, action.payload);
            state.repliedMessages = deleteMessageFromState(state.repliedMessages, action.payload);
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

            const messageInSelectedMessages = state.selectedMessages.find(
                (messageInSelectedMessagesState) =>
                    messageInSelectedMessagesState.messageId === action.payload.messageId,
            );

            if (messageInSelectedMessages) {
                return;
            }

            messageInState.isMessageSelected = true;
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
            state.readMessages = setMessageStateWithUniqueValue(state.readMessages, action.payload);
            state.messages = setMessageStateWithUniqueValue(state.messages, action.payload);
        },
        forwardMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }
            state.forwardedMessages.push(action.payload);
            state.messages.push(action.payload);
        },
        selectMessageToReply: (state, action: PayloadAction<IMessage>) => {
            state.selectedMessageToReply = action.payload;
        },
        deselectMessageToReply: (state) => {
            state.selectedMessageToReply = null;
        },
        addToRepliedMessages: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages) {
                return;
            }
            state.messages.push(action.payload);
            state.repliedMessages.push(action.payload);
        },
        deleteMessagesToReply: (state, action: PayloadAction<IMessage[]>) => {
            state.repliedMessages = setMessageStateAfterDeleteMessages(state.repliedMessages, action.payload);
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
                state.readMessages = setMessagesStateWithUniqueValues(state.readMessages, action.payload);
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
            })
            .addCase(replyToMessage.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.repliedMessages.push(action.payload);
                state.messages.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(replyToMessage.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(sendMessageWithAttachedFiles.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.messages.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(sendMessageWithAttachedFiles.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(sendHiddenMessage.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                state.messages.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(sendHiddenMessage.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(revealHiddenMessage.fulfilled, (state, action) => {
                if (!state.messages) {
                    return;
                }
                // state.messages = state.messages.map((message) =>
                //     message.messageId === action.payload.messageId ? action.payload : message,
                // );
                state.isLoading = false;
                state.error = null;
            })
            .addCase(revealHiddenMessage.rejected, (state, action) => {
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
    selectMessageToReply,
    deselectMessageToReply,
    deleteMessagesToReply,
    addToRepliedMessages,
} = messageModel.actions;

export const reducer = messageModel.reducer;
