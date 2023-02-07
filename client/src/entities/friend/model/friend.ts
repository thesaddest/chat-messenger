import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import FriendService from "../api/friend.service";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";

import { IAddFriendValues, IFriend, IFriendStatus, IGetFriendsBySearchQuery, IGetMoreFriends } from "./interfaces";

interface FriendState {
    friends: IFriend[] | null;
    isLoading: boolean;
    error: string | null;
    friendIdActiveKey: string;
}

const initialState: FriendState = {
    friends: null,
    isLoading: true,
    error: null,
    friendIdActiveKey: DEFAULT_ACTIVE_KEY,
};

export const getFriendsBySearchValue = (searchValue: string, friends: IFriend[]): IFriend[] => {
    return friends.filter((friend) => {
        return searchValue.toLowerCase() === "" ? friend : friend.username.toLowerCase().includes(searchValue);
    });
};

const setFriendsStateWithUniqueValues = (friends: IFriend[], action: PayloadAction<IFriend[]>): IFriend[] => {
    return friends.concat(
        action.payload.filter(({ username }) => !friends.find((friend) => friend.username === username)),
    );
};

export const getFriendsBySearchQuery = createAsyncThunk<IFriend[], IGetFriendsBySearchQuery, { rejectValue: string }>(
    "friends/getFriendsBySearchQuery",
    async function (searchQuery, { rejectWithValue }) {
        try {
            const { data } = await FriendService.getFriendsBySearchQuery(searchQuery);

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
    "friends/getFriendsWithLimit",
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
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getFriends.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.friends = null;
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getFriendsBySearchQuery.fulfilled, (state, action) => {
                if (!state.friends || action.payload.length === 0) {
                    return;
                }
                state.friends = setFriendsStateWithUniqueValues(state.friends, action);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getFriendsBySearchQuery.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.friends = null;
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getFriendsWithLimit.fulfilled, (state, action) => {
                if (!state.friends || action.payload.length === 0) {
                    return;
                }
                state.friends = setFriendsStateWithUniqueValues(state.friends, action);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getFriendsWithLimit.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                if (!state.friends) {
                    return;
                }
                state.friends.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addFriend.rejected, (state, action) => {
                if (!action.payload) {
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { initUser, setFriendIdActiveKey } = friendModel.actions;

export const reducer = friendModel.reducer;
