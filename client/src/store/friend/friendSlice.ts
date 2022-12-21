import { createSlice } from "@reduxjs/toolkit";

export interface IFriend {
    id: string;
    username: string;
    connected: boolean;
}

interface FriendState {
    friends: IFriend[];
}

const initialState: FriendState = {
    friends: [
        { id: "1", username: "John Doe", connected: false },
        { id: "2", username: "Sarah Connor", connected: true },
        { id: "3", username: "Peter Dark", connected: false },
    ],
};
const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {},
});

export default friendSlice.reducer;
