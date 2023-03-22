import { User } from "../user/user.entity.js";
import { AppDataSource } from "../db/database.js";
import { Room } from "./room.entity.js";
import { v4 as uuidv4 } from "uuid";
import { Friend } from "../friend/friend.entity.js";
import { notificationService } from "../notification/notification.service.js";
import { userService } from "../user/user.service.js";

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

        const roomsCreatedByUser = await roomRepository.find({ where: { createdBy: user.username } });
        const roomsUserParticipant = await roomRepository.find({ where: { participants: { userId: user.userId } } });

        return roomsCreatedByUser
            .concat(roomsUserParticipant)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
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
        const user = await userService.getUserByUsername(friend.username);
        return (
            room.invitedFriends.some((invitedFriend) => invitedFriend.username === friend.username) ||
            room.participants.some((participant) => participant.username === user.username)
        );
    }

    async acceptInviteToJoinRoom(username: string, roomId: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await this.getRoomById(roomId);
        const userToAdd = await userService.getUserByUsername(username);

        room.participants.push(userToAdd);
        room.invitedFriends = room.invitedFriends.filter((invitedFriend) => invitedFriend.username !== username);

        return await roomRepository.save(room);
    }
}

export const roomService = new RoomService();
