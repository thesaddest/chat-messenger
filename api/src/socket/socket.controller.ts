import { socketService } from "./socket.service.js";
import { Socket } from "socket.io";
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

export const getFriends = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_FRIENDS);
};

export const sendMessage = async (socket: Socket, messageDto: MessageDto): Promise<void> => {
    socket.to(messageDto.to).emit(SOCKET_EVENTS.SEND_MESSAGE, messageDto);
};

export const deleteMessages = async (socket: Socket, messageDtos: MessageDto[]): Promise<void> => {
    for (const messageDto of messageDtos) {
        socket.to(messageDto.to).emit(SOCKET_EVENTS.DELETE_MESSAGES, messageDto);
    }
};

export const getMessages = async (socket: Socket): Promise<void> => {
    socket.emit(SOCKET_EVENTS.GET_ALL_MESSAGES);
};
