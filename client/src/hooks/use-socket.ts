import { useEffect } from "react";

import { socketDisconnect, socketError } from "../store/auth/authSlice";
import { getAllFriends } from "../store/friend/friendSlice";
import { SOCKET_EVENTS } from "../socket-io/socket.constants";
import { socket } from "../socket-io";

import { IFriend, IMessage } from "../api/interfaces";

import { getAllMessages } from "../store/message/messageSlice";

import { useAppDispatch, useAppSelector } from "./redux-hooks";

export const useSocket = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        socket.auth = {
            id: user?.id,
            username: user?.username,
            token: user?.token,
        };
        socket.connect();

        socket.on(SOCKET_EVENTS.GET_ALL_MESSAGES, (messages: IMessage[]) => {
            dispatch(getAllMessages(messages));
        });

        socket.on(SOCKET_EVENTS.GET_ALL_FRIENDS, (friends: IFriend[]) => {
            dispatch(getAllFriends(friends));
        });

        socket.on(SOCKET_EVENTS.ON_CONNECT, () => {
            //send friend's username, and state.friend.username === username, set it to online
            console.log("user connected");
        });

        socket.on(SOCKET_EVENTS.ON_DISCONNECT, () => {
            socket.auth = {
                id: null,
                username: null,
                token: null,
            };
            dispatch(socketDisconnect());
        });

        socket.on(SOCKET_EVENTS.ERROR, (e) => {
            socket.auth = {
                id: null,
                username: null,
                token: null,
            };
            dispatch(socketError(e.message));
        });

        return () => {
            socket.off(SOCKET_EVENTS.ON_CONNECT);
            socket.off(SOCKET_EVENTS.GET_ALL_MESSAGES);
            socket.off(SOCKET_EVENTS.ERROR);
            socket.off(SOCKET_EVENTS.ON_DISCONNECT);
        };
    }, [dispatch, user]);
};
