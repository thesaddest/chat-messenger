import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import RoomService from "../api/room.service";
import { socket } from "../../../shared/socket-io";
import { DEFAULT_ACTIVE_KEY, SOCKET_EVENTS } from "../../../shared/const";

import { IAcceptInviteToJoinRoom, ICreateRoomValues, IInviteFriendToJoinRoomData, IRoom } from "./interfaces";

interface RoomState {
    rooms: IRoom[];
    roomIdActiveKey: string;
    status: "start" | "pending" | "succeeded" | "failed";
}

const initialState: RoomState = {
    rooms: [],
    status: "start",
    roomIdActiveKey: DEFAULT_ACTIVE_KEY,
};

export const getRooms = createAsyncThunk<IRoom[], undefined, { rejectValue: string }>(
    "room/getRooms",
    async function (_, { rejectWithValue }) {
        const { data } = await RoomService.getRooms();

        if (!data) {
            return rejectWithValue("Error while creating room");
        }

        return data;
    },
);

export const createRoom = createAsyncThunk<IRoom, ICreateRoomValues, { rejectValue: string }>(
    "room/createRoom",
    async function (createRoomValues, { rejectWithValue }) {
        const { data } = await RoomService.createRoom(createRoomValues);

        if (!data) {
            return rejectWithValue("Error while creating room");
        }

        socket.emit(SOCKET_EVENTS.CREATE_ROOM, data);
        return data;
    },
);

export const inviteFriendToJoinRoom = createAsyncThunk<IRoom, IInviteFriendToJoinRoomData, { rejectValue: string }>(
    "room/inviteFriendToJoinRoom",
    async function ({ roomId, roomName, friendUsername, sentBy, notificationId }, { rejectWithValue }) {
        try {
            const { data } = await RoomService.inviteFriendToJoinRoom({
                notificationId: notificationId,
                friendUsername: friendUsername,
                roomId: roomId,
                roomName: roomName,
                sentBy: sentBy,
            });

            socket.emit(SOCKET_EVENTS.INVITE_TO_ROOM, {
                roomId: roomId,
                roomName: roomName,
                friendUsername: friendUsername,
            });

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const acceptInviteToJoinRoom = createAsyncThunk<IRoom, IAcceptInviteToJoinRoom, { rejectValue: string }>(
    "room/acceptInviteToJoinRoom",
    async function ({ roomId, username }, { rejectWithValue }) {
        try {
            const { data } = await RoomService.acceptInviteToJoinRoom({
                roomId: roomId,
                username: username,
            });

            socket.emit(SOCKET_EVENTS.ACCEPT_INVITE_TO_JOIN_ROOM, {
                roomId: roomId,
                username: username,
            });

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const roomModel = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setRoomIdActiveKey(state, action: PayloadAction<string>) {
            state.roomIdActiveKey = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.status = "succeeded";
            })
            .addCase(getRooms.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getRooms.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(createRoom.pending, (state) => {
                state.status = "pending";
            })
            .addCase(createRoom.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(inviteFriendToJoinRoom.fulfilled, (state, action) => {
                //Change to return only invited friend, not the whole room
                state.rooms.map((room) => room.invitedFriends.concat(action.payload.invitedFriends));
                state.status = "succeeded";
            })
            .addCase(inviteFriendToJoinRoom.pending, (state) => {
                state.status = "pending";
            })
            .addCase(inviteFriendToJoinRoom.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(acceptInviteToJoinRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(acceptInviteToJoinRoom.pending, (state) => {
                state.status = "pending";
            })
            .addCase(acceptInviteToJoinRoom.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { setRoomIdActiveKey } = roomModel.actions;

export const reducer = roomModel.reducer;
