import { socketService } from "./socket.service.js";
import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "./socket.constants.js";
import { MessageDto } from "../message/message.dto.js";
import { RoomDto } from "../room/room.dto.js";
import { InviteFriendToRoomValues } from "./interfaces.js";
import { userService } from "../user/user.service.js";
import { Room } from "../room/room.entity.js";

export const onInitUser = async (socket: Socket): Promise<void> => {
    const user = await socketService.initUser(socket);
    const friendsRooms = await socketService.getFriendsRooms(socket);

    socket.join(user.userId);
    socket.to(friendsRooms).emit(SOCKET_EVENTS.ON_INIT_USER, { connected: true, username: user.username });
};

export const onDeInitUser = async (socket: Socket): Promise<void> => {
    const user = await socketService.deInitUser(socket);
    const friendsRooms = await socketService.getFriendsRooms(socket);

    socket.to(friendsRooms).emit(SOCKET_EVENTS.ON_DEINIT_USER, { connected: false, username: user.username });
};

export const getFriends = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_FRIENDS);
};

export const sendMessage = async (socket: Socket, messageDto: MessageDto): Promise<void> => {
    socket.to(messageDto.to).emit(SOCKET_EVENTS.SEND_MESSAGE, messageDto);
};

export const deleteMessages = async (socket: Socket, messageDtos: MessageDto[]): Promise<void> => {
    for (const messageDto of messageDtos) {
        socket.to(messageDto.to).emit(SOCKET_EVENTS.DELETE_MESSAGES, { messageId: messageDto.messageId });
        socket.to(messageDto.from).emit(SOCKET_EVENTS.DELETE_MESSAGES, { messageId: messageDto.messageId });
    }
};

export const readMessages = async (socket: Socket, messageDtos: MessageDto[]): Promise<void> => {
    for (const messageDto of messageDtos) {
        socket.to(messageDto.from).emit(SOCKET_EVENTS.READ_MESSAGES, messageDto);
    }
};

export const forwardMessages = async (socket: Socket, messageDtos: MessageDto[]): Promise<void> => {
    for (const messageDto of messageDtos) {
        socket.to(messageDto.to).emit(SOCKET_EVENTS.FORWARD_MESSAGES, messageDto);
        socket.to(messageDto.from).emit(SOCKET_EVENTS.FORWARD_MESSAGES, messageDto);
    }
};

export const replyToMessage = async (socket: Socket, messageDto: MessageDto): Promise<void> => {
    socket.to(messageDto.to).emit(SOCKET_EVENTS.REPLY_TO_MESSAGE, messageDto);
};

export const createRoom = async (socket: Socket, roomDto: RoomDto): Promise<void> => {
    socket.join(roomDto.roomId);
};

export const inviteToRoom = async (
    socket: Socket,
    inviteFriendToRoomValues: InviteFriendToRoomValues,
): Promise<void> => {
    const userToSendInvite = await userService.getUserByUsername(inviteFriendToRoomValues.friendUsername);
    socket.to(userToSendInvite.userId).emit(SOCKET_EVENTS.INVITE_TO_ROOM, inviteFriendToRoomValues);
};

export const acceptInviteToRoom = async (socket: Socket, joinedRoom: Room): Promise<void> => {
    socket.join(joinedRoom.roomId);
    for (const participant of joinedRoom.participants) {
        socket.to(participant.userId).emit(SOCKET_EVENTS.ACCEPT_INVITE_TO_JOIN_ROOM, joinedRoom);
    }
    socket.to(joinedRoom.ownerId).emit(SOCKET_EVENTS.ACCEPT_INVITE_TO_JOIN_ROOM, joinedRoom);
};

export const getMessages = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_MESSAGES);
};

export const getRooms = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_ROOMS);
};

export const getNotifications = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_ROOM_NOTIFICATIONS);
};
