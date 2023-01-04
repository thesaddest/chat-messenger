import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import friendReducer from "./friend/friendSlice";
import messageReducer from "./message/messageSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        friend: friendReducer,
        message: messageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
