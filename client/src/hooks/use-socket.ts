import { useEffect } from "react";

import { socketError } from "../store/auth/authSlice";
import { addFriend, getFriends, initUser } from "../store/friend/friendSlice";
import { SOCKET_EVENTS } from "../socket-io/socket.constants";
import { socket } from "../socket-io";
import { IFriend, IFriendStatus, IMessage } from "../api/interfaces";
import { getMessages, sendMessage } from "../store/message/messageSlice";

import { useAppDispatch, useAppSelector } from "./redux-hooks";

export const useSocket = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        socket.auth = {
            id: user?.userId,
            username: user?.username,
            token: user?.token,
        };
        socket.connect();

        socket.on(SOCKET_EVENTS.ON_CONNECT, (friendStatus: IFriendStatus) => {
            dispatch(initUser(friendStatus));
        });

        socket.on(SOCKET_EVENTS.GET_ALL_FRIENDS, () => {
            dispatch(getFriends());
        });

        socket.on(SOCKET_EVENTS.GET_ALL_MESSAGES, () => {
            dispatch(getMessages());
        });

        socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message: IMessage) => {
            dispatch(sendMessage(message));
        });

        socket.on(SOCKET_EVENTS.ADD_FRIEND, (friend: IFriend) => {
            dispatch(addFriend(friend));
        });

        socket.on(SOCKET_EVENTS.ON_DISCONNECT, (friendStatus: IFriendStatus) => {
            dispatch(initUser(friendStatus));
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
            socket.off(SOCKET_EVENTS.GET_ALL_FRIENDS);
            socket.off(SOCKET_EVENTS.SEND_MESSAGE);
            socket.off(SOCKET_EVENTS.ADD_FRIEND);
            socket.off(SOCKET_EVENTS.ERROR);
            socket.off(SOCKET_EVENTS.ON_DISCONNECT);
        };
    }, [dispatch, user]);
};
