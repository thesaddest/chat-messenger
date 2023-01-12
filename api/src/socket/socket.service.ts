import { User } from "./../user/user.entity.js";
import { Socket } from "socket.io";
import { userService } from "../user/user.service.js";
import { friendService } from "../friend/friend.service.js";
import { redisClient } from "../redis/index.js";

class SocketService {
    async getCurrentUser(socket: Socket): Promise<User> {
        return await userService.getUserByUsername(socket.handshake.auth.username);
    }

    async getFriendsRooms(socket: Socket): Promise<string[]> {
        const user = await socketService.getCurrentUser(socket);
        const userFriends = await friendService.getUserFriends(user);
        const friends = await friendService.getConnectedFriends(userFriends);

        return friends.map(friend => friend.username);
    }

    async initUser(socket: Socket): Promise<User> {
        const user = await this.getCurrentUser(socket);
        await redisClient.hset(`username:${user.username}`, "socketid", socket.id, "connected", true);
        socket.join(user.username);

        return user;
    }

    async deinitUser(socket: Socket): Promise<User> {
        const user = await this.getCurrentUser(socket);
        await redisClient.hset(`username:${user.username}`, "socketid", socket.id, "connected", false);

        return user;
    }
}

export const socketService = new SocketService();
