import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFriend } from "../../api/interfaces";

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
    },
});

export const { addFriend, getAllFriends } = friendSlice.actions;

export default friendSlice.reducer;
