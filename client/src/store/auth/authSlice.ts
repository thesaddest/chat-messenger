import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

import AuthService from "../../api/auth/auth.service";
import { IUser } from "../../api/interfaces";
import { IAuthValues } from "../../components/Auth/interfaces";

interface AuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk<IUser, IAuthValues, { rejectValue: string }>(
    "auth/login",
    async function (userData, { rejectWithValue }) {
        const { data } = await AuthService.login(userData);

        if (!data || data === undefined) {
            return rejectWithValue("An error occured while login");
        }

        localStorage.setItem("token", data.token);

        return data;
    },
);

export const register = createAsyncThunk<IUser, IAuthValues, { rejectValue: string }>(
    "auth/register",
    async function (userData, { rejectWithValue }) {
        const { data } = await AuthService.register(userData);

        if (!data || data === undefined) {
            return rejectWithValue("An error occured while register");
        }

        localStorage.setItem("token", data.token);

        return data;
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default authSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}
