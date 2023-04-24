import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import UserService from "../api/user.service";
import { ILoginValues } from "../../../pages/login/interfaces";
import { IRegisterValues } from "../../../pages/register/interfaces";
import { USER_API } from "../api/api.constants";

import { IChangeAvatarPayload, IUser } from "./interfaces";

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuth: false,
};

export const login = createAsyncThunk<IUser, ILoginValues, { rejectValue: string }>(
    `${USER_API.AUTH_ENTITY}/${USER_API.LOGIN}`,
    async function (userData, { rejectWithValue }) {
        try {
            const { data } = await UserService.login(userData);

            localStorage.setItem("token", data.token);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const register = createAsyncThunk<IUser, IRegisterValues, { rejectValue: string }>(
    `${USER_API.AUTH_ENTITY}/${USER_API.REGISTER}`,
    async function (userData, { rejectWithValue }) {
        try {
            const { data } = await UserService.register(userData);

            localStorage.setItem("token", data.token);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const changeAvatar = createAsyncThunk<string, IChangeAvatarPayload, { rejectValue: string }>(
    `${USER_API.USER_ENTITY}/${USER_API.CHANGE_AVATAR}`,
    async function ({ username, formData }, { rejectWithValue }) {
        try {
            const filePath = `${username}/AVATAR`;
            const { data } = await UserService.changeAvatar(formData, filePath);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const userModel = createSlice({
    name: `${USER_API.AUTH_ENTITY}`,
    initialState,
    reducers: {
        socketError(state, action: PayloadAction<string>) {
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(login.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(register.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(changeAvatar.fulfilled, (state, action) => {
                if (!state.user) {
                    return;
                }
                state.user.avatarPath = action.payload;
            });
    },
});

export const { socketError } = userModel.actions;

export const reducer = userModel.reducer;
