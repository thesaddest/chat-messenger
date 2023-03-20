import { User } from "../user/user.entity.js";
import { AppDataSource } from "../db/database.js";
import { Room } from "./room.entity.js";
import { v4 as uuidv4 } from "uuid";
import { userService } from "../user/user.service.js";
import { Friend } from "../friend/friend.entity.js";
import { notificationService } from "../notification/notification.service.js";

class RoomService {
    async createRoom(user: User, roomName: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);

        const newRoom = {
            roomId: uuidv4(),
            roomName: roomName,
            createdBy: user.username,
            ownerId: user.userId,
        };

        const room = roomRepository.create(newRoom);
        return await roomRepository.save(room);
    }

    async getUserRooms(user: User): Promise<Room[]> {
        const roomRepository = AppDataSource.getRepository(Room);

        return await roomRepository.find({ where: { createdBy: user.username } });
    }

    async getRoomById(roomId: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);

        return roomRepository.findOne({ where: { roomId: roomId } });
    }

    async inviteFriendToRoom(friend: Friend, roomId: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await this.getRoomById(roomId);
        room.invitedFriends.push(friend);

        return await roomRepository.save(room);
    }

    async isFriendAlreadyInvitedToRoom(friend: Friend, roomId: string): Promise<boolean> {
        const room = await this.getRoomById(roomId);

        return room.invitedFriends.some((invitedFriend) => invitedFriend.username === friend.username);
    }

    async acceptInviteToJoinRoom(username: string, roomId: string, notificationId: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await this.getRoomById(roomId);
        const userToAdd = await userService.getUserByUsername(username);

        room.participants.push(userToAdd);
        await this.deleteFromInvitedFriends(username, roomId);
        await notificationService.deleteRoomNotification(notificationId);

        return await roomRepository.save(room);
    }

    private async deleteFromInvitedFriends(username: string, roomId: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await this.getRoomById(roomId);

        room.invitedFriends.filter((invitedFriend) => invitedFriend.username !== username);
        return await roomRepository.save(room);
    }
}

export const roomService = new RoomService();
