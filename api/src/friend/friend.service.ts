import { User } from "./../user/user.entity.js";
import { Friend } from "./friend.entity.js";
import { AppDataSource } from "../db/database.js";
import { FriendDto } from "./friend.dto.js";
import { userService } from "../user/user.service.js";
import { redisService } from "../redis/redis.service.js";

class FriendService {
    async addFriend(friend: Friend, user: User): Promise<FriendDto> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const userBehindFriend = await userService.getUserByUsername(friend.username);

        friend.userBehindFriend = userBehindFriend.userId;
        friend.user = user;
        friend.addedBy = user.username;

        await friendRepository.save(friend);

        return {
            userBehindFriend: friend.userBehindFriend,
            username: friend.username,
            addedBy: friend.addedBy,
            connected: await redisService.getFriendConnectedStatusByUsername(friend.username),
        };
    }

    async createFriend(username: string): Promise<Friend> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const friend = friendRepository.create({ username });
        await friendRepository.save(friend);

        return friend;
    }

    async hasFriend(user: User, friendUsername: string): Promise<Friend> {
        return user.friends.find(({ username }) => username === friendUsername);
    }

    async getUserFriendsWithLimit(user: User, skip: string): Promise<FriendDto[]> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const friends = await friendRepository.find({
            where: { addedBy: user.username },
            take: 11,
            skip: Number(skip),
        });

        return friends.map((friend) => {
            return {
                userBehindFriend: friend.userBehindFriend,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: false,
            };
        });
    }

    async getUserFriends(user: User): Promise<FriendDto[]> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const friends = await friendRepository.find({ where: { addedBy: user.username } });

        return friends.map((friend) => {
            return {
                userBehindFriend: friend.userBehindFriend,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: false,
            };
        });
    }

    async getConnectedFriends(friends: FriendDto[]): Promise<FriendDto[]> {
        const connectedFriends = [];
        for (const friend of friends) {
            connectedFriends.push({
                userBehindFriend: friend.userBehindFriend,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: await redisService.getFriendConnectedStatusByUsername(friend.username),
            });
        }
        return connectedFriends;
    }
}

export const friendService = new FriendService();
