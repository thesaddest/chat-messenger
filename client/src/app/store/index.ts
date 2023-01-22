import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../entities/user/model/user";
import friendReducer from "../../entities/friend/model/friend";
import messageReducer from "../../entities/message/model/message";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        friend: friendReducer,
        message: messageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
