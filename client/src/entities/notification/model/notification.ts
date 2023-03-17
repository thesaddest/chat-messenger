import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IInviteFriendToJoinRoomData } from "../../room";
import NotificationService from "../api/notification.service";

import { INotification, IRoomNotification } from "./interfaces";

interface RoomState {
    notifications: INotification;
    notificationLength: number;
    status: "start" | "pending" | "succeeded" | "failed";
}

const initialState: RoomState = {
    notifications: {
        roomNotifications: [
            {
                roomId: "",
                friendUsername: "",
                roomName: "",
            },
        ],
    },
    notificationLength: 0,
    status: "start",
};

export const getAllRoomNotifications = createAsyncThunk<IRoomNotification[], undefined, { rejectValue: string }>(
    "notification/getAllRoomNotifications",
    async function (_, { rejectWithValue }) {
        const { data } = await NotificationService.getAllRoomNotifications();

        if (!data) {
            return rejectWithValue("Error while getting messages");
        }

        return data;
    },
);

export const notificationModel = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        receiveNotificationInviteToJoinRoom: (state, action: PayloadAction<IInviteFriendToJoinRoomData>) => {
            if (state.notifications) {
                state.notifications.roomNotifications.push(action.payload);
                state.notificationLength += 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRoomNotifications.fulfilled, (state, action) => {
                state.notifications.roomNotifications = action.payload;
                state.notificationLength = state.notificationLength + action.payload.length;
                state.status = "succeeded";
            })
            .addCase(getAllRoomNotifications.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllRoomNotifications.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { receiveNotificationInviteToJoinRoom } = notificationModel.actions;

export const reducer = notificationModel.reducer;
