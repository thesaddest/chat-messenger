import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFriend, IFriendStatus } from "../../api/interfaces";
import FriendService from "../../api/friend/friend.service";
import { DEFAULT_ACTIVE_KEY } from "../../components/Home/Chat/chat.constants";

interface FriendState {
    friends: IFriend[] | null;
    loading: boolean;
    error: string | null;
    friendIdActiveKey: string;
}

const initialState: FriendState = {
    friends: null,
    loading: true,
    error: null,
    friendIdActiveKey: DEFAULT_ACTIVE_KEY,
};
export const getFriends = createAsyncThunk<IFriend[], undefined, { rejectValue: string }>(
    "friends/getFriends",
    async function(_, { rejectWithValue }) {
        const { data } = await FriendService.getFriends();

        if (!data) {
            return rejectWithValue("Error while getting friends");
        }

        return data;
    });

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        initUser(state, action: PayloadAction<IFriendStatus>) {
            const friend = state.friends?.find(friend => friend.username === action.payload.username);

            if (!friend) {
                return;
            }

            friend.connected = action.payload.connected;
        },
        addFriend(state, action: PayloadAction<IFriend>) {
            state.friends?.push(action.payload);
        },
        setFriendIdActiveKey(state, action: PayloadAction<string>) {
            state.friendIdActiveKey = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getFriends.pending, (state) => {
                state.friends = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.friends = [];
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                }
            });
    },
});

export const { addFriend, initUser, setFriendIdActiveKey } = friendSlice.actions;

export default friendSlice.reducer;
