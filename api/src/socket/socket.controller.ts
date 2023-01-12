import { socketService } from "./socket.service.js";
import { AddFriendCB } from "./interfaces.js";
import { Socket } from "socket.io";
import { Friend } from "../friend/friend.entity.js";
import { friendService } from "../friend/friend.service.js";
import { userService } from "../user/user.service.js";
import { FriendDto } from "../friend/friend.dto.js";
import { SOCKET_EVENTS } from "./socket.constants.js";
import { MessageDto } from "../message/message.dto.js";
import { messageService } from "../message/message.service.js";

export const onInitUser = async (socket: Socket) => {
    const user = await socketService.initUser(socket);
    const friendsRooms = await socketService.getFriendsRooms(socket);

    socket.to(friendsRooms).emit(SOCKET_EVENTS.ON_INIT_USER, { connected: true, username: user.username });
};

export const onDeinitUser = async (socket: Socket) => {
    const user = await socketService.deinitUser(socket);
    const friendsRooms = await socketService.getFriendsRooms(socket);

    socket.to(friendsRooms).emit(SOCKET_EVENTS.ON_DEINIT_USER, { connected: false, username: user.username });
};

export const addFriend = async (username: string, cb: AddFriendCB, socket: Socket): Promise<void | Friend> => {
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

export const getFriends = async (socket: Socket): Promise<FriendDto[]> => {
    const user = await socketService.getCurrentUser(socket);
    const userFriends = await friendService.getUserFriends(user);
    const friends = await friendService.getConnectedFriends(userFriends);
    socket.emit(SOCKET_EVENTS.GET_ALL_FRIENDS, friends);

    return friends;
};

export const sendMessage = async (socket: Socket, messageDto: MessageDto) => {
    const message = await messageService.createMessage(messageDto);
    console.log(message);
};