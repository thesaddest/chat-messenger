import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ICreateRoomNotification, IDeleteRoomNotification, IRoomNotification } from "../model";

import { NOTIFICATION_API } from "./api.constants";

export default class NotificationService {
    static async getAllRoomNotifications(): Promise<AxiosResponse<IRoomNotification[]>> {
        return api.get<IRoomNotification[]>(`${NOTIFICATION_API.ENTITY}/${NOTIFICATION_API.ALL_ROOM_NOTIFICATIONS}`);
    }

    static async createRoomNotification(
        createRoomNotification: ICreateRoomNotification,
    ): Promise<AxiosResponse<IRoomNotification>> {
        return api.post<IRoomNotification>(
            `${NOTIFICATION_API.ENTITY}/${NOTIFICATION_API.CREATE_ROOM_NOTIFICATION}`,
            createRoomNotification,
        );
    }

    static async deleteRoomNotification(
        notificationId: IDeleteRoomNotification,
    ): Promise<AxiosResponse<IRoomNotification>> {
        return api.delete<IRoomNotification>(
            `${NOTIFICATION_API.ENTITY}/${NOTIFICATION_API.DELETE_ROOM_NOTIFICATION}`,
            { data: notificationId },
        );
    }
}
