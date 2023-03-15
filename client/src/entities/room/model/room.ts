import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import RoomService from "../api/room.service";

import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";

import { ICreateRoomValues, IRoom } from "./interfaces";

interface RoomState {
    rooms: IRoom[];
    status: "start" | "pending" | "succeeded" | "failed";
}

const initialState: RoomState = {
    rooms: [],
    status: "start",
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

export const roomModel = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
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

export const {} = roomModel.actions;

export const reducer = roomModel.reducer;
