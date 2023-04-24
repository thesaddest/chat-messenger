import { Like } from "typeorm";
import { User } from "./../user/user.entity.js";
import { Friend } from "./friend.entity.js";
import { AppDataSource } from "../db/database.js";
import { FriendDto } from "./friend.dto.js";
import { userService } from "../user/user.service.js";
import { redisService } from "../redis/redis.service.js";
import { DEFAULT_TAKE_AMOUNT } from "./friend.constants.js";

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
            avatarPath: friend.avatarPath,
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
            take: DEFAULT_TAKE_AMOUNT,
            skip: Number(skip),
        });

        return friends.map((friend) => {
            return {
                userBehindFriend: friend.userBehindFriend,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: false,
                avatarPath: friend.avatarPath,
            };
        });
    }

    async getAllUserFriends(user: User): Promise<FriendDto[]> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const friends = await friendRepository.find({ where: { addedBy: user.username } });

        return friends.map((friend) => {
            return {
                userBehindFriend: friend.userBehindFriend,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: false,
                avatarPath: friend.avatarPath,
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
                avatarPath: friend.avatarPath,
            });
        }
        return connectedFriends;
    }

    async getFriendsBySearchQuery(user: User, searchQuery: string): Promise<FriendDto[]> {
        const friendRepository = AppDataSource.getRepository(Friend);
        const friends = await friendRepository.find({
            where: { addedBy: user.username, username: Like(`%${searchQuery}%`) },
        });

        return friends.map((friend) => {
            return {
                userBehindFriend: friend.userBehindFriend,
                username: friend.username,
                addedBy: friend.addedBy,
                connected: false,
                avatarPath: friend.avatarPath,
            };
        });
    }

    async setFriendsAvatarPathByUser(user: User, avatarPath: string): Promise<void> {
        const friendRepository = AppDataSource.getRepository(Friend);
        await friendRepository.update({ username: user.username }, { avatarPath: avatarPath });
    }
}

export const friendService = new FriendService();
