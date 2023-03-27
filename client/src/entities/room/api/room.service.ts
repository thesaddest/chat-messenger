import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IAcceptInviteToJoinRoom, ICreateRoomValues, IRoom } from "../model";
import { IRoomNotification } from "../../notification";

import { ROOM_API } from "./api.constants";

export default class RoomService {
    static async createRoom(roomName: ICreateRoomValues): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>(`${ROOM_API.ENTITY}/${ROOM_API.CREATE_ROOM}`, roomName);
    }

    static async getRooms(): Promise<AxiosResponse<IRoom[]>> {
        return api.get<IRoom[]>(`${ROOM_API.ENTITY}/${ROOM_API.ALL_ROOMS}`);
    }

    static async inviteFriendToJoinRoom(
        inviteFriendToRoomOnFinishValues: IRoomNotification,
    ): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>(
            `${ROOM_API.ENTITY}/${ROOM_API.INVITE_FRIEND_TO_JOIN_ROOM}`,
            inviteFriendToRoomOnFinishValues,
        );
    }

    static async acceptInviteToJoinRoom(
        acceptInviteToJoinRoom: IAcceptInviteToJoinRoom,
    ): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>(`${ROOM_API.ENTITY}/${ROOM_API.ACCEPT_INVITE_TO_JOIN_ROOM}`, acceptInviteToJoinRoom);
    }
}
