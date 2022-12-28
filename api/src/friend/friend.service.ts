import { User } from "./../user/user.entity.js";
import { Friend } from "./friend.entity.js";
import { AppDataSource } from "../db/database.js";
import { FriendDto } from "./friend.dto.js";

class FriendService {
    async addFriend(friend: Friend, user: User): Promise<FriendDto> {
        const friendRepository = AppDataSource.getRepository(Friend);

        friend.user = user;
        await friendRepository.save(friend);

        return {
            id: friend.id,
            username: friend.username,
            connected: friend.connected,
        };
    }

    async createFriend(username: string): Promise<Friend> {
        const friendRepository = AppDataSource.getRepository(Friend);

        const friend = await friendRepository.create({ username });
        await friendRepository.save(friend);

        return friend;
    }

    async getFriendByUsername(username: string): Promise<Friend> {
        const friendRepository = AppDataSource.getRepository(Friend);

        return await friendRepository.findOne({ where: { username } });
    }

    async hasFriend(user: User, friendUsername: string): Promise<Friend> {
        return user.friends.find(({ username }) => username === friendUsername);
    }

    async getUserFriends(user: User): Promise<FriendDto[]> {
        const friends = user.friends;

        return friends.map((friend) => {
            return { id: friend.id, username: friend.username, connected: friend.connected };
        });
    }
}

export const friendService = new FriendService();
