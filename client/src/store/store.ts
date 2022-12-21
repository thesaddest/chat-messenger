import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import friendReducer from "./friend/friendSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        friend: friendReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
