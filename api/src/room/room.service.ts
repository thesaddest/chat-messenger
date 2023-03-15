import { User } from "../user/user.entity.js";
import { AppDataSource } from "../db/database.js";
import { Room } from "./room.entity.js";
import { v4 as uuidv4 } from "uuid";
import { RoomDto } from "./room.dto.js";

class RoomService {
    async createRoom(user: User, roomName: string): Promise<RoomDto> {
        const roomRepository = AppDataSource.getRepository(Room);

        const newRoom = {
            roomId: uuidv4(),
            roomName: roomName,
            createdBy: user.username,
            owner: user,
        };

        const room = roomRepository.create(newRoom);
        const savedRoom = await roomRepository.save(room);

        return {
            roomId: savedRoom.roomId,
            roomName: savedRoom.roomName,
            createdBy: savedRoom.createdBy,
        };
    }

    async getUserRooms(user: User): Promise<RoomDto[]> {
        const roomRepository = AppDataSource.getRepository(Room);

        const rooms = await roomRepository.find({ where: { createdBy: user.username } });

        return rooms.map((room) => ({
            roomId: room.roomId,
            roomName: room.roomName,
            createdBy: room.createdBy,
        }));
    }
}

export const roomService = new RoomService();
