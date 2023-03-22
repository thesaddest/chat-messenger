import { RoomNotification } from "../room/room-notification.entity.js";
import { AppDataSource } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";

class NotificationService {
    async createRoomNotification(
        username: string,
        friendUsername: string,
        roomId: string,
        roomName: string,
    ): Promise<RoomNotification> {
        const roomNotificationRepository = AppDataSource.getRepository(RoomNotification);

        const roomNotification = {
            notificationId: uuidv4(),
            friendUsername: friendUsername,
            roomId: roomId,
            roomName: roomName,
            sentBy: username,
        };

        return await roomNotificationRepository.save(roomNotification);
    }

    async getRoomNotificationsByUsername(username: string): Promise<RoomNotification[]> {
        const roomNotificationRepository = AppDataSource.getRepository(RoomNotification);

        return await roomNotificationRepository.find({ where: { friendUsername: username } });
    }

    async deleteRoomNotification(notificationId: string): Promise<RoomNotification> {
        const roomNotificationRepository = AppDataSource.getRepository(RoomNotification);

        const notificationToDelete = await roomNotificationRepository.findOne({
            where: { notificationId: notificationId },
        });

        return await roomNotificationRepository.remove(notificationToDelete);
    }
}

export const notificationService = new NotificationService();
