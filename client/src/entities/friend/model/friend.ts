import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import FriendService from "../api/friend.service";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";

import { FRIEND_API } from "../api/api.constants";

import { IAddFriendValues, IFriend, IFriendStatus, IGetFriendsBySearchQuery, IGetMoreFriends } from "./interfaces";

interface FriendState {
    friends: IFriend[];
    isLoading: boolean;
    error: string | null;
    friendIdActiveKey: string;
}

const initialState: FriendState = {
    friends: [],
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

const isFriendsStateNeedUpdate = (friends: IFriend[], action: PayloadAction<IFriend[]>): boolean => {
    return !action.payload.every((friendInPayload) =>
        friends.some((friendInState) => friendInPayload.username === friendInState.username),
    );
};

export const getFriendsBySearchQuery = createAsyncThunk<IFriend[], IGetFriendsBySearchQuery, { rejectValue: string }>(
    `${FRIEND_API.ENTITY}/${FRIEND_API.SEARCH}`,
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
    `${FRIEND_API.ENTITY}/${FRIEND_API.ALL_FRIENDS}`,
    async function (_, { rejectWithValue }) {
        const { data } = await FriendService.getFriends();

        if (!data) {
            return rejectWithValue("Error while getting friends");
        }

        return data;
    },
);

export const getFriendsWithLimit = createAsyncThunk<IFriend[], IGetMoreFriends, { rejectValue: string }>(
    `${FRIEND_API.ENTITY}/${FRIEND_API.SEARCH}-with-limit`,
    async function (moreFriendsData, { rejectWithValue }) {
        try {
            const { data } = await FriendService.getFriendsWithLimit(moreFriendsData);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const addFriend = createAsyncThunk<IFriend, IAddFriendValues, { rejectValue: string }>(
    `${FRIEND_API.ENTITY}/${FRIEND_API.ADD_FRIEND}`,
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
    name: `${FRIEND_API.ENTITY}`,
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
                state.friends = [];
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getFriendsBySearchQuery.fulfilled, (state, action) => {
                if (!state.friends || action.payload.length === 0 || !isFriendsStateNeedUpdate(state.friends, action)) {
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
