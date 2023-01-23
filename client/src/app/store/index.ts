import { configureStore } from "@reduxjs/toolkit";

import { userModel } from "../../entities/user";
import { friendModel } from "../../entities/friend";
import { messageModel } from "../../entities/message";

export const store = configureStore({
    reducer: {
        auth: userModel.reducer,
        friend: friendModel.reducer,
        message: messageModel.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
