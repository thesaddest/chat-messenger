import { RoomNotification } from "../room/room-notification.entity.js";
import { AppDataSource } from "../db/database.js";
import { userService } from "../user/user.service.js";

class NotificationService {
    async createRoomNotification(friendUsername: string, roomId: string, roomName: string): Promise<RoomNotification> {
        const roomNotificationRepository = AppDataSource.getRepository(RoomNotification);

        const roomNotification = {
            friendUsername: friendUsername,
            roomId: roomId,
            roomName: roomName,
            sentTo: await userService.getUserByUsername(friendUsername),
        };

        return await roomNotificationRepository.save(roomNotification);
    }

    async getRoomNotificationsByUsername(username: string): Promise<RoomNotification[]> {
        const roomNotificationRepository = AppDataSource.getRepository(RoomNotification);

        return await roomNotificationRepository.find({ where: { friendUsername: username } });
    }
}

export const notificationService = new NotificationService();
