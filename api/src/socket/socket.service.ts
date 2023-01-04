import { User } from "./../user/user.entity.js";
import { Socket } from "socket.io";
import { userService } from "../user/user.service.js";

class SocketService {
    async getCurrentUser(socket: Socket): Promise<User> {
        return await userService.getUserByUsername(socket.handshake.auth.username);
    }
}

export const socketService = new SocketService();
