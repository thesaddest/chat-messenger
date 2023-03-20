import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IAcceptInviteToJoinRoom, ICreateRoomValues, IInviteFriendToJoinRoomData, IRoom } from "../model";

export default class RoomService {
    static async createRoom(roomName: ICreateRoomValues): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>("/room/create-room", roomName);
    }

    static async getRooms(): Promise<AxiosResponse<IRoom[]>> {
        return api.get<IRoom[]>("/room/rooms");
    }

    static async inviteFriendToJoinRoom(
        inviteFriendToRoomOnFinishValues: IInviteFriendToJoinRoomData,
    ): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>("/room/invite-friend-to-join-room", inviteFriendToRoomOnFinishValues);
    }

    static async acceptInviteToJoinRoom(
        acceptInviteToJoinRoom: IAcceptInviteToJoinRoom,
    ): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>("/room/accept-invite-to-join-room", acceptInviteToJoinRoom);
    }
}
