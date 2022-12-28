import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFriend } from "../../components/Home/Navbar/AddFriend/interfaces";

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
        getFriends(state, action: PayloadAction<IFriend[]>) {
            state.friends = action.payload;
        },
        addFriend(state, action: PayloadAction<IFriend>) {
            state.friends.push(action.payload);
        },
    },
});

export const { addFriend, getFriends } = friendSlice.actions;

export default friendSlice.reducer;
