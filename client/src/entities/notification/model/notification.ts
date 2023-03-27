import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import NotificationService from "../api/notification.service";

import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS, STATE_STATUSES } from "../../../shared/const";

import { NOTIFICATION_API } from "../api/api.constants";

import { ICreateRoomNotification, IDeleteRoomNotification, INotification, IRoomNotification } from "./interfaces";

interface RoomState {
    notifications: INotification;
    notificationLength: number;
    status: STATE_STATUSES;
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
    status: STATE_STATUSES.START,
};

export const getAllRoomNotifications = createAsyncThunk<IRoomNotification[], undefined, { rejectValue: string }>(
    `${NOTIFICATION_API.ENTITY}/${NOTIFICATION_API.ALL_ROOM_NOTIFICATIONS}`,
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
>(
    `${NOTIFICATION_API.ENTITY}/${NOTIFICATION_API.CREATE_ROOM_NOTIFICATION}`,
    async function (createRoomNotificationPayload, { rejectWithValue }) {
        const { data } = await NotificationService.createRoomNotification(createRoomNotificationPayload);

        if (!data) {
            return rejectWithValue("Error while getting messages");
        }

        socket.emit(SOCKET_EVENTS.INVITE_TO_ROOM, data);
        return data;
    },
);

export const deleteRoomNotification = createAsyncThunk<
    IRoomNotification,
    IDeleteRoomNotification,
    { rejectValue: string }
>(
    `${NOTIFICATION_API.ENTITY}/${NOTIFICATION_API.DELETE_ROOM_NOTIFICATION}`,
    async function (createRoomNotificationPayload, { rejectWithValue }) {
        const { data } = await NotificationService.deleteRoomNotification(createRoomNotificationPayload);

        if (!data) {
            return rejectWithValue("Error while getting messages");
        }

        return data;
    },
);

export const notificationModel = createSlice({
    name: `${NOTIFICATION_API.ENTITY}`,
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
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(getAllRoomNotifications.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(getAllRoomNotifications.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            })
            .addCase(deleteRoomNotification.fulfilled, (state, action) => {
                state.notifications.roomNotifications = current(state.notifications.roomNotifications).filter(
                    (roomNotification) => roomNotification.notificationId !== action.payload.notificationId,
                );
                state.notificationLength -= 1;
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(deleteRoomNotification.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(deleteRoomNotification.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            });
    },
});

export const { receiveNotificationInviteToJoinRoom } = notificationModel.actions;

export const reducer = notificationModel.reducer;
