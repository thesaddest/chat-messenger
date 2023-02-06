import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import FriendService from "../api/friend.service";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";

import { IAddFriendValues, IFriend, IFriendStatus, IGetMoreFriends } from "./interfaces";

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

export const getFriendsBySearchValue = (searchValue: string, friends: IFriend[]): IFriend[] => {
    return friends.filter((friend) => {
        return searchValue.toLowerCase() === "" ? friend : friend.username.toLowerCase().includes(searchValue);
    });
};

export const getAllRemainingFriends = createAsyncThunk<IFriend[], IGetMoreFriends, { rejectValue: string }>(
    "friends/getAllRemainingFriends",
    async function (moreFriendsData, { rejectWithValue }) {
        try {
            const { data } = await FriendService.getAllRemainingFriends(moreFriendsData);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const getFriends = createAsyncThunk<IFriend[], undefined, { rejectValue: string }>(
    "friends/getFriends",
    async function (_, { rejectWithValue }) {
        const { data } = await FriendService.getFriends();

        if (!data) {
            return rejectWithValue("Error while getting friends");
        }

        return data;
    },
);

export const getFriendsWithLimit = createAsyncThunk<IFriend[], IGetMoreFriends, { rejectValue: string }>(
    "friends/getMoreFriends",
    async function (moreFriendsData, { rejectWithValue }) {
        try {
            const { data } = await FriendService.getMoreFriends(moreFriendsData);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const addFriend = createAsyncThunk<IFriend, IAddFriendValues, { rejectValue: string }>(
    "friends/addFriend",
    async function (username, { rejectWithValue }) {
        try {
            const { data } = await FriendService.addFriend(username);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const friendModel = createSlice({
    name: "friend",
    initialState,
    reducers: {
        initUser(state, action: PayloadAction<IFriendStatus>) {
            const friend = state.friends?.find((friend) => friend.username === action.payload.username);

            if (!friend) {
                return;
            }

            friend.connected = action.payload.connected;
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
                state.loading = true;
                state.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.friends = null;
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getAllRemainingFriends.fulfilled, (state, action) => {
                if (!state.friends) {
                    return;
                }
                state.friends = state.friends.concat(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllRemainingFriends.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.friends = null;
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getFriendsWithLimit.fulfilled, (state, action) => {
                if (!state.friends || action.payload.length === 0) {
                    return;
                }
                state.friends = state.friends.concat(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(getFriendsWithLimit.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                if (!state.friends) {
                    return;
                }
                state.friends.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(addFriend.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { initUser, setFriendIdActiveKey } = friendModel.actions;

export const reducer = friendModel.reducer;
