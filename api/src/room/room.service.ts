import { User } from "../user/user.entity.js";
import { AppDataSource } from "../db/database.js";
import { Room } from "./room.entity.js";
import { v4 as uuidv4 } from "uuid";
import { userService } from "../user/user.service.js";
import { Friend } from "../friend/friend.entity.js";

class RoomService {
    async createRoom(user: User, roomName: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);

        const newRoom = {
            roomId: uuidv4(),
            roomName: roomName,
            createdBy: user.username,
            owner: user,
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

    async addFriendToRoom(username: string, roomId: string): Promise<Room> {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await this.getRoomById(roomId);
        const userToAdd = await userService.getUserByUsername(username);

        room.participants.push(userToAdd);
        const results = await roomRepository.save(room);
        console.log(results);
        return results;
    }
}

export const roomService = new RoomService();
