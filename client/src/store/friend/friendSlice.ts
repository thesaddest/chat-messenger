import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFriend } from "../../components/Home/Navbar/AddFriend/interfaces";

interface IConnectedFriend {
    socketId: string;
    userId: number;
    username: string;
    connected: boolean;
}

interface FriendState {
    friends: IFriend[];
    connectedFriends: IConnectedFriend[];
}

const initialState: FriendState = {
    friends: [],
    connectedFriends: [],
};

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        getAllFriends(state, action: PayloadAction<IFriend[]>) {
            state.friends = action.payload;
        },
        addFriend(state, action: PayloadAction<IFriend>) {
            state.friends.push(action.payload);
        },
        getConnectedFriends(state, action: PayloadAction<IConnectedFriend[]>) {
            state.connectedFriends = action.payload;
        },
    },
});

export const { addFriend, getAllFriends, getConnectedFriends } = friendSlice.actions;

export default friendSlice.reducer;
