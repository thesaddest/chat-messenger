import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IRoomNotification } from "../model/interfaces";

export default class NotificationService {
    static async getAllRoomNotifications(): Promise<AxiosResponse<IRoomNotification[]>> {
        return api.get<IRoomNotification[]>("/notification/room-notifications");
    }
}
