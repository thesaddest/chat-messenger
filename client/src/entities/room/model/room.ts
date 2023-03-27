import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import RoomService from "../api/room.service";
import { socket } from "../../../shared/socket-io";
import { DEFAULT_ACTIVE_KEY, SOCKET_EVENTS, STATE_STATUSES } from "../../../shared/const";
import { IRoomNotification } from "../../notification";
import { IFriend } from "../../friend";

import { ROOM_API } from "../api/api.constants";

import { IAcceptInviteToJoinRoom, ICreateRoomValues, IRoom } from "./interfaces";

interface RoomState {
    rooms: IRoom[];
    roomIdActiveKey: string;
    status: STATE_STATUSES;
}

const initialState: RoomState = {
    rooms: [],
    status: STATE_STATUSES.START,
    roomIdActiveKey: DEFAULT_ACTIVE_KEY,
};

export const isChatsAreRoom = (chats: IRoom[] | IFriend[]): chats is IRoom[] =>
    chats.some((item) => isChatIsRoom(item));

export const isChatIsRoom = (chat: IRoom | IFriend): chat is IRoom => "roomId" in chat;

export const getRooms = createAsyncThunk<IRoom[], undefined, { rejectValue: string }>(
    `${ROOM_API.ENTITY}/${ROOM_API.ALL_ROOMS}`,
    async function (_, { rejectWithValue }) {
        const { data } = await RoomService.getRooms();

        if (!data) {
            return rejectWithValue("Error while creating room");
        }

        return data;
    },
);

export const createRoom = createAsyncThunk<IRoom, ICreateRoomValues, { rejectValue: string }>(
    `${ROOM_API.ENTITY}/${ROOM_API.CREATE_ROOM}`,
    async function (createRoomValues, { rejectWithValue }) {
        const { data } = await RoomService.createRoom(createRoomValues);

        if (!data) {
            return rejectWithValue("Error while creating room");
        }

        socket.emit(SOCKET_EVENTS.CREATE_ROOM, data);
        return data;
    },
);

export const inviteFriendToJoinRoom = createAsyncThunk<IRoom, IRoomNotification, { rejectValue: string }>(
    `${ROOM_API.ENTITY}/${ROOM_API.INVITE_FRIEND_TO_JOIN_ROOM}`,
    async function ({ roomId, roomName, friendUsername, sentBy, notificationId }, { rejectWithValue }) {
        try {
            const { data } = await RoomService.inviteFriendToJoinRoom({
                notificationId: notificationId,
                friendUsername: friendUsername,
                roomId: roomId,
                roomName: roomName,
                sentBy: sentBy,
            });

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const acceptInviteToJoinRoom = createAsyncThunk<IRoom, IAcceptInviteToJoinRoom, { rejectValue: string }>(
    `${ROOM_API.ENTITY}/${ROOM_API.ACCEPT_INVITE_TO_JOIN_ROOM}`,
    async function ({ roomId, username }, { rejectWithValue }) {
        try {
            const { data } = await RoomService.acceptInviteToJoinRoom({
                roomId: roomId,
                username: username,
            });

            socket.emit(SOCKET_EVENTS.ACCEPT_INVITE_TO_JOIN_ROOM, data);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const roomModel = createSlice({
    name: `${ROOM_API.ENTITY}`,
    initialState,
    reducers: {
        setRoomIdActiveKey(state, action: PayloadAction<string>) {
            state.roomIdActiveKey = action.payload;
        },
        friendJoinedRoom(state, action: PayloadAction<IRoom>) {
            const joinedRoom = state.rooms.find((room) => room.roomId === action.payload.roomId);

            if (!joinedRoom) {
                return;
            }

            joinedRoom.participants = action.payload.participants;
            joinedRoom.invitedFriends = action.payload.invitedFriends;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(getRooms.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(getRooms.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(createRoom.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(createRoom.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            })
            .addCase(inviteFriendToJoinRoom.fulfilled, (state, action) => {
                const roomToInviteFriend = state.rooms.find((room) => room.roomId === action.payload.roomId);

                if (!roomToInviteFriend) {
                    return;
                }

                roomToInviteFriend.invitedFriends = action.payload.invitedFriends;
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(inviteFriendToJoinRoom.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(inviteFriendToJoinRoom.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            })
            .addCase(acceptInviteToJoinRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(acceptInviteToJoinRoom.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(acceptInviteToJoinRoom.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            });
    },
});

export const { setRoomIdActiveKey, friendJoinedRoom } = roomModel.actions;

export const reducer = roomModel.reducer;
