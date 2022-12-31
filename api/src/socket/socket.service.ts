import { User } from "./../user/user.entity.js";
import { Server, Socket } from "socket.io";
import { userService } from "../user/user.service.js";
import { ConnectedUser } from "./interfaces.js";
import { friendService } from "../friend/friend.service.js";

class SocketService {
    async getCurrentUser(socket: Socket): Promise<User> {
        return await userService.getUserByUsername(socket.handshake.auth.username);
    }

    async getAllConnectedUsers(io: Server): Promise<ConnectedUser[]> {
        const connectedUsers = [];

        for (const [socketId, socket] of io.of("/").sockets) {
            connectedUsers.push({
                socketId: socketId,
                userId: socket.handshake.auth.id,
                username: socket.handshake.auth.username,
                connected: socket.handshake.auth.connected,
            });
        }

        return connectedUsers;
    }

    async getConnectedFriends(socket: Socket, connectedUsers: ConnectedUser[]): Promise<ConnectedUser[]> {
        const user = await socketService.getCurrentUser(socket);
        const userFriends = await friendService.getUserFriends(user);

        const connectedFriends = connectedUsers.filter((connectedUser) => {
            return userFriends.some((userFriend) => {
                return connectedUser.username === userFriend.username;
            });
        });

        return connectedFriends;
    }
}

export const socketService = new SocketService();
