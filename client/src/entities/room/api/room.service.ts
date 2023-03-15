import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ICreateRoomValues, IRoom } from "../model";

export default class RoomService {
    static async createRoom(roomName: ICreateRoomValues): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>("/room/create-room", roomName);
    }

    static async getRooms(): Promise<AxiosResponse<IRoom[]>> {
        return api.get<IRoom[]>("/room/rooms");
    }
}
