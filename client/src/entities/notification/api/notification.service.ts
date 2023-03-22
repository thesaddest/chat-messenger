import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ICreateRoomNotification, IDeleteRoomNotification, IRoomNotification } from "../model/interfaces";

export default class NotificationService {
    static async getAllRoomNotifications(): Promise<AxiosResponse<IRoomNotification[]>> {
        return api.get<IRoomNotification[]>("/notification/room-notifications");
    }

    static async createRoomNotification(
        createRoomNotification: ICreateRoomNotification,
    ): Promise<AxiosResponse<IRoomNotification>> {
        return api.post<IRoomNotification>("/notification/create-room-notification", createRoomNotification);
    }

    static async deleteRoomNotification(
        notificationId: IDeleteRoomNotification,
    ): Promise<AxiosResponse<IRoomNotification>> {
        return api.delete<IRoomNotification>("/notification/delete-room-notification", { data: notificationId });
    }
}
