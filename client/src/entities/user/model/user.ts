import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

import UserService from "../api/user.service.";
import { IUser } from "../../friend/model/interfaces";
import { ILoginValues } from "../../../pages/login/interfaces";
import { IRegisterValues } from "../../../pages/register/interfaces";

interface AuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuth: false,
};

export const login = createAsyncThunk<IUser, ILoginValues, { rejectValue: string }>(
    "auth/login",
    async function(userData, { rejectWithValue }) {
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
    "auth/register",
    async function(userData, { rejectWithValue }) {
        try {
            const { data } = await UserService.register(userData);

            localStorage.setItem("token", data.token);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

const userModel = createSlice({
    name: "auth",
    initialState,
    reducers: {
        socketError(state, action: PayloadAction<string>) {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(login.pending, (state) => {
                state.user = null;
                state.loading = true;
                state.error = null;
                state.isAuth = false;
            }).addCase(register.pending, (state) => {
            state.user = null;
            state.loading = true;
            state.error = null;
            state.isAuth = false;
        })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
                state.isAuth = false;
            });
    },
});

export const { socketError } = userModel.actions;

export default userModel.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}
