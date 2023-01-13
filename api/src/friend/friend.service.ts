import { User } from "./../user/user.entity.js";
import { Friend } from "./friend.entity.js";
import { AppDataSource } from "../db/database.js";
import { FriendDto } from "./friend.dto.js";
import { redisClient } from "../redis/index.js";

class FriendService {
    async addFriend(friend: Friend, user: User): Promise<FriendDto> {
        const friendRepository = AppDataSource.getRepository(Friend);

        friend.user = user;
        friend.addedBy = user.username;
        await friendRepository.save(friend);

        return {
            id: friend.id,
            username: friend.username,
            addedBy: friend.addedBy,
            connected: false,
        };
    }

    async createFriend(username: string): Promise<Friend> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const friend = await friendRepository.create({ username });
        await friendRepository.save(friend);

        return friend;
    }

    async hasFriend(user: User, friendUsername: string): Promise<Friend> {
        return user.friends.find(({ username }) => username === friendUsername);
    }

    async getUserFriends(user: User): Promise<FriendDto[]> {
        const friends = user.friends;

        return friends.map((friend) => {
            return { id: friend.id, username: friend.username, addedBy: friend.addedBy, connected: false };
        });
    }

    async getConnectedFriends(friends: FriendDto[]): Promise<FriendDto[]> {
        const connectedFriends = [];
        for (const friend of friends) {
            const connected = await redisClient.hget(`username:${friend.username}`, "connected");
            connectedFriends.push({
                id: friend.id,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: (connected === null || connected === "false") ? false : connected,
            });
        }
        return connectedFriends;
    }
}

export const friendService = new FriendService();
