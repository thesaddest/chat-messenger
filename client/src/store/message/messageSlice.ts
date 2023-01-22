import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMessage } from "../../api/interfaces";
import MessageService from "../../api/message/message.service";

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

export const sendMessage = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>("messages/sendMessage", async function(messageData, { rejectWithValue }) {
    try {
        const { data } = await MessageService.sendMessage(messageData);

        return data;
    } catch (e) {
        return rejectWithValue("Error while sending message");
    }
});

export const getMessages = createAsyncThunk<IMessage[], undefined, { rejectValue: string }>("messages/getMessages", async function(_, { rejectWithValue }) {
    const response = await MessageService.getMessages();

    if (!response.data) {
        return rejectWithValue("Error while getting messages");
    }

    return response.data;
});

const messageSlice = createSlice({
    name: "friend",
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
                state.messages = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.messages = [];
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                }
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
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                }
            });
    },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
