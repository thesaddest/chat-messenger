import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ICreateRoomValues, IInviteFriendToRoomOnFinishValues, IRoom } from "../model";
import { IFriend } from "../../friend";

export default class RoomService {
    static async createRoom(roomName: ICreateRoomValues): Promise<AxiosResponse<IRoom>> {
        return api.post<IRoom>("/room/create-room", roomName);
    }

    static async getRooms(): Promise<AxiosResponse<IRoom[]>> {
        return api.get<IRoom[]>("/room/rooms");
    }

    static async inviteFriendToJoinRoom(
        friendUsername: IInviteFriendToRoomOnFinishValues,
    ): Promise<AxiosResponse<IFriend>> {
        return api.post<IFriend>("/room/invite-friend-to-join-room", friendUsername);
    }
}
