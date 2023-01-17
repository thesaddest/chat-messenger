import { socketService } from "./socket.service.js";
import { AddFriendCB } from "./interfaces.js";
import { Socket } from "socket.io";
import { friendService } from "../friend/friend.service.js";
import { userService } from "../user/user.service.js";
import { SOCKET_EVENTS } from "./socket.constants.js";
import { MessageDto } from "../message/message.dto.js";

export const onInitUser = async (socket: Socket): Promise<void> => {
    const user = await socketService.initUser(socket);
    const friendsRooms = await socketService.getFriendsRooms(socket);

    socket.join(user.userId);
    socket.to(friendsRooms).emit(SOCKET_EVENTS.ON_INIT_USER, { connected: true, username: user.username });
};

export const onDeinitUser = async (socket: Socket): Promise<void> => {
    const user = await socketService.deinitUser(socket);
    const friendsRooms = await socketService.getFriendsRooms(socket);

    socket.to(friendsRooms).emit(SOCKET_EVENTS.ON_DEINIT_USER, { connected: false, username: user.username });
};

export const addFriend = async (username: string, cb: AddFriendCB, socket: Socket): Promise<void> => {
    const existingUser = await userService.getUserByUsername(username);

    if (!existingUser) {
        return cb({ error: "User doesn't exist", friend: null });
    }

    const currentUser = await socketService.getCurrentUser(socket);
    const existingFriend = await friendService.hasFriend(currentUser, username);

    if (existingFriend) {
        return cb({ error: "This user has already been added to your friends list", friend: null });
    }

    if (socket.handshake.auth.username === username) {
        return cb({ error: "You can not add your self", friend: null });
    }

    const newFriend = await friendService.createFriend(username);
    const addedFriend = await friendService.addFriend(newFriend, currentUser);

    return cb({ error: null, friend: addedFriend });
};

export const getFriends = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_FRIENDS);
};

export const sendMessage = async (socket: Socket, messageDto: MessageDto): Promise<void> => {
    socket.to(messageDto.to).emit(SOCKET_EVENTS.SEND_MESSAGE, messageDto);
};

export const getMessages = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_MESSAGES);
};