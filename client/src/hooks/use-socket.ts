import { useEffect } from "react";

import { socketLogout } from "../store/auth/authSlice";
import { getFriends } from "../store/friend/friendSlice";

import { IFriend } from "./../components/Home/Navbar/AddFriend/interfaces";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { socket } from "./../socket-io/index";

export const useSocket = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        socket.auth = {
            username: user?.username,
            token: user?.token,
        };
        socket.connect();

        socket.on("friends", (friends: IFriend[]) => {
            dispatch(getFriends(friends));
        });

        socket.on("connect_error", (e) => {
            dispatch(socketLogout(e.message));
            socket.auth = {
                username: null,
                token: null,
            };
        });

        return () => {
            socket.off("connect_error");
        };
    }, [dispatch, user]);
};
