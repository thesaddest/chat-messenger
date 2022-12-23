import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

import AuthService from "../../api/auth/auth.service";
import { IUser } from "../../api/interfaces";
import { ILoginValues, IRegisterValues } from "../../components/Auth/interfaces";

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
    async function (userData, { rejectWithValue }) {
        try {
            const { data } = await AuthService.login(userData);

            localStorage.setItem("token", data.token);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

export const register = createAsyncThunk<IUser, IRegisterValues, { rejectValue: string }>(
    "auth/register",
    async function (userData, { rejectWithValue }) {
        try {
            const { data } = await AuthService.register(userData);

            localStorage.setItem("token", data.token);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        socketLogout(state, action: PayloadAction<string>) {
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
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
                state.isAuth = false;
            })
            .addMatcher(isPending, (state) => {
                state.user = null;
                state.loading = true;
                state.error = null;
                state.isAuth = false;
            });
    },
});

export const { socketLogout } = authSlice.actions;

export default authSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}

function isPending(action: AnyAction) {
    return action.type.endsWith("pending");
}
