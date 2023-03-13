import { User } from "../user/user.entity.js";
import { AppDataSource } from "../db/database.js";
import { Room } from "./room.entity.js";
import { v4 as uuidv4 } from "uuid";

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
}

export const roomService = new RoomService();
