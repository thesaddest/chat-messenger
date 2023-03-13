import { User } from "./../user/user.entity.js";
import { Socket } from "socket.io";
import { userService } from "../user/user.service.js";
import { friendService } from "../friend/friend.service.js";
import { redisClient } from "../redis/index.js";
import { Room } from "../room/room.entity.js";

class SocketService {
    async getCurrentUser(socket: Socket): Promise<User> {
        return await userService.getUserByUsername(socket.handshake.auth.username);
    }

    async getFriendsRooms(socket: Socket): Promise<string[]> {
        const user = await socketService.getCurrentUser(socket);
        const userFriends = await friendService.getAllUserFriends(user);
        const friends = await friendService.getConnectedFriends(userFriends);

        return friends.map((friend) => friend.userBehindFriend);
    }

    async initUser(socket: Socket): Promise<User> {
        const user = await this.getCurrentUser(socket);
        await redisClient.hset(`username:${user.username}`, "userId", user.userId, "connected", true);

        return user;
    }

    async deInitUser(socket: Socket): Promise<User> {
        const user = await this.getCurrentUser(socket);
        await redisClient.hset(`username:${user.username}`, "userId", user.userId, "connected", false);

        return user;
    }
}

export const socketService = new SocketService();
