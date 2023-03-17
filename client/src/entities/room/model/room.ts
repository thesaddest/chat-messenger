import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import RoomService from "../api/room.service";
import { socket } from "../../../shared/socket-io";
import { DEFAULT_ACTIVE_KEY, SOCKET_EVENTS } from "../../../shared/const";
import { IFriend } from "../../friend";

import { ICreateRoomValues, IInviteFriendToJoinRoomData, IRoom } from "./interfaces";

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

export const inviteFriendToJoinRoom = createAsyncThunk<IFriend, IInviteFriendToJoinRoomData, { rejectValue: string }>(
    "room/inviteFriendToJoinRoom",
    async function ({ roomId, roomName, friendUsername }, { rejectWithValue }) {
        try {
            const { data } = await RoomService.inviteFriendToJoinRoom({
                friendUsername: friendUsername,
                roomId: roomId,
                roomName: roomName,
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
            });
    },
});

export const { setRoomIdActiveKey } = roomModel.actions;

export const reducer = roomModel.reducer;
