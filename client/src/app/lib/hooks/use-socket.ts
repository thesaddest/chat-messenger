import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";
import { getFriends, IFriendStatus, initUser } from "../../../entities/friend";
import {
    addMessage,
    addToRepliedMessages,
    deleteMessage,
    forwardMessage,
    getMessages,
    getReadMessages,
    IMessage,
    readMessage,
} from "../../../entities/message";
import { socketError } from "../../../entities/user";
import { getRooms, IInviteFriendToJoinRoomData } from "../../../entities/room";
import {
    getAllRoomNotifications,
    receiveNotificationInviteToJoinRoom,
} from "../../../entities/notification/model/notification";

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

        socket.on(SOCKET_EVENTS.GET_ALL_MESSAGES, async () => {
            await dispatch(getMessages());
            await dispatch(getReadMessages());
        });

        socket.on(SOCKET_EVENTS.GET_ALL_ROOMS, () => {
            dispatch(getRooms());
        });

        socket.on(SOCKET_EVENTS.GET_ALL_ROOM_NOTIFICATIONS, () => {
            dispatch(getAllRoomNotifications());
        });

        socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message: IMessage) => {
            dispatch(addMessage(message));
        });

        socket.on(SOCKET_EVENTS.DELETE_MESSAGES, (message: IMessage) => {
            dispatch(deleteMessage(message));
        });

        socket.on(SOCKET_EVENTS.READ_MESSAGES, (message: IMessage) => {
            dispatch(readMessage(message));
        });

        socket.on(SOCKET_EVENTS.FORWARD_MESSAGES, (message: IMessage) => {
            dispatch(forwardMessage(message));
        });

        socket.on(SOCKET_EVENTS.REPLY_TO_MESSAGE, (message: IMessage) => {
            dispatch(addToRepliedMessages(message));
        });

        socket.on(SOCKET_EVENTS.INVITE_TO_ROOM, (inviteFriendToJoinRoomData: IInviteFriendToJoinRoomData) => {
            dispatch(receiveNotificationInviteToJoinRoom(inviteFriendToJoinRoomData));
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
            socket.off(SOCKET_EVENTS.GET_ALL_ROOMS);
            socket.off(SOCKET_EVENTS.GET_ALL_ROOM_NOTIFICATIONS);
            socket.off(SOCKET_EVENTS.SEND_MESSAGE);
            socket.off(SOCKET_EVENTS.ADD_FRIEND);
            socket.off(SOCKET_EVENTS.DELETE_MESSAGES);
            socket.off(SOCKET_EVENTS.FORWARD_MESSAGES);
            socket.off(SOCKET_EVENTS.INVITE_TO_ROOM);
            socket.off(SOCKET_EVENTS.ERROR);
            socket.off(SOCKET_EVENTS.ON_DISCONNECT);
        };
    }, [dispatch, user]);
};
