import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import RoomService from "../api/room.service";

import { ICreateRoomValues, IRoom } from "./interfaces";

interface RoomState {
    rooms: IRoom[];
    status: "start" | "pending" | "succeeded" | "failed";
}

const initialState: RoomState = {
    rooms: [],
    status: "start",
};

export const createRoom = createAsyncThunk<IRoom, ICreateRoomValues, { rejectValue: string }>(
    "files/uploadSingleFile",
    async function (createRoomValues, { rejectWithValue }) {
        const { data } = await RoomService.createRoom(createRoomValues);

        if (!data) {
            return rejectWithValue("Error while creating room");
        }

        return data;
    },
);

export const roomModel = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
