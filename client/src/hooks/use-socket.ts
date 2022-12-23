import { useEffect } from "react";

import { socketLogout } from "../store/auth/authSlice";

import { useAppDispatch, useAppSelector } from "./redux-hooks";

import { socket } from "./../socket-io/index";

export const useSocket = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        socket.auth = {
            token: user?.token,
        };
        socket.connect();
        socket.on("connect_error", (e) => {
            dispatch(socketLogout(e.message));
        });

        return () => {
            socket.off("connect_error");
        };
    }, [dispatch, user]);
};
