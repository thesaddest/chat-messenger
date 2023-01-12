import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFriend, IFriendStatus } from "../../api/interfaces";

interface FriendState {
    friends: IFriend[];
}

const initialState: FriendState = {
    friends: [],
};

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        getAllFriends(state, action: PayloadAction<IFriend[]>) {
            state.friends = action.payload;
        },
        addFriend(state, action: PayloadAction<IFriend>) {
            state.friends?.push(action.payload);
        },
        setFriendConnectedStatus(state, action: PayloadAction<IFriendStatus>) {
            const friend = state.friends.find(friend => friend.username === action.payload.username);

            if (!friend) {
                return;
            }

            friend.connected = action.payload.connected;
        },
    },
});

export const { addFriend, getAllFriends, setFriendConnectedStatus } = friendSlice.actions;

export default friendSlice.reducer;
