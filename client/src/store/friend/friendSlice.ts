import { createSlice } from "@reduxjs/toolkit";

interface IFriend {
    username: string;
    connected: boolean;
}

interface FriendState {
    friends: IFriend[];
}

const initialState: FriendState = {
    friends: [],
};
const friendSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export default friendSlice.reducer;
