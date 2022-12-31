import { useEffect } from "react";

import { socketError } from "../store/auth/authSlice";
import { getAllFriends, getConnectedFriends } from "../store/friend/friendSlice";
import { SOCKET_EVENTS } from "../socket-io/socket.constants";
import { IConnectedUser } from "../socket-io/interfaces";

import { IFriend } from "./../components/Home/Navbar/AddFriend/interfaces";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { socket } from "./../socket-io/index";

export const useSocket = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        socket.auth = {
            id: user?.id,
            username: user?.username,
            token: user?.token,
            connected: true,
        };
        socket.connect();

        socket.on(SOCKET_EVENTS.GET_ALL_FRIENDS, (friends: IFriend[]) => {
            dispatch(getAllFriends(friends));
        });

        socket.on(SOCKET_EVENTS.GET_CONNECTED_FRIENDS, (connectedFriends: IConnectedUser[]) => {
            dispatch(getConnectedFriends(connectedFriends));
        });

        socket.on(SOCKET_EVENTS.ERROR, (e) => {
            dispatch(socketError(e.message));
            socket.auth = {
                id: null,
                username: null,
                token: null,
                connected: false,
            };
        });

        return () => {
            socket.off(SOCKET_EVENTS.ERROR);
        };
    }, [dispatch, user]);
};
