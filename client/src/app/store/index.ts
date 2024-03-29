import { configureStore } from "@reduxjs/toolkit";

import { userModel } from "../../entities/user";
import { friendModel } from "../../entities/friend";
import { messageModel } from "../../entities/message";
import { fileModel } from "../../entities/file";
import { roomModel } from "../../entities/room";
import { notificationModel } from "../../entities/notification/model/notification";

export const store = configureStore({
    reducer: {
        auth: userModel.reducer,
        friend: friendModel.reducer,
        message: messageModel.reducer,
        file: fileModel.reducer,
        room: roomModel.reducer,
        notification: notificationModel.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
