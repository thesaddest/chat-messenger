import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import NotificationService from "../api/notification.service";

import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";

import { ICreateRoomNotification, IDeleteRoomNotification, INotification, IRoomNotification } from "./interfaces";

interface RoomState {
    notifications: INotification;
    notificationLength: number;
    status: "start" | "pending" | "succeeded" | "failed";
}

const initialState: RoomState = {
    notifications: {
        roomNotifications: [
            {
                notificationId: "",
                roomId: "",
                friendUsername: "",
                roomName: "",
                sentBy: "",
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

export const createRoomNotification = createAsyncThunk<
    IRoomNotification,
    ICreateRoomNotification,
    { rejectValue: string }
>("notification/createRoomNotification", async function (createRoomNotificationPayload, { rejectWithValue }) {
    const { data } = await NotificationService.createRoomNotification(createRoomNotificationPayload);

    if (!data) {
        return rejectWithValue("Error while getting messages");
    }

    socket.emit(SOCKET_EVENTS.INVITE_TO_ROOM, data);
    return data;
});

export const deleteRoomNotification = createAsyncThunk<
    IRoomNotification,
    IDeleteRoomNotification,
    { rejectValue: string }
>("notification/deleteRoomNotification", async function (createRoomNotificationPayload, { rejectWithValue }) {
    const { data } = await NotificationService.deleteRoomNotification(createRoomNotificationPayload);

    if (!data) {
        return rejectWithValue("Error while getting messages");
    }

    return data;
});

export const notificationModel = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        receiveNotificationInviteToJoinRoom: (state, action: PayloadAction<IRoomNotification>) => {
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
                state.notificationLength = action.payload.length;
                state.status = "succeeded";
            })
            .addCase(getAllRoomNotifications.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllRoomNotifications.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(deleteRoomNotification.fulfilled, (state, action) => {
                state.notifications.roomNotifications = current(state.notifications.roomNotifications).filter(
                    (roomNotification) => roomNotification.notificationId !== action.payload.notificationId,
                );
                state.notificationLength -= 1;
                state.status = "succeeded";
            })
            .addCase(deleteRoomNotification.pending, (state) => {
                state.status = "pending";
            })
            .addCase(deleteRoomNotification.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { receiveNotificationInviteToJoinRoom } = notificationModel.actions;

export const reducer = notificationModel.reducer;
