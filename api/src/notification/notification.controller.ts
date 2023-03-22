import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { notificationService } from "./notification.service.js";

interface ITypedRequest<T> extends Request {
    body: T;
}

interface IInviteFriendToRoomRequest {
    friendUsername: string;
    roomId: string;
    roomName: string;
    sentBy: string;
}

interface IDeleteNotificationRequest {
    notificationId: string;
}

class NotificationController {
    async getAllRoomNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const roomNotifications = await notificationService.getRoomNotificationsByUsername(user.username);
            return res.json(roomNotifications);
        } catch (e) {
            next(e);
        }
    }

    async createRoomNotification(req: ITypedRequest<IInviteFriendToRoomRequest>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { friendUsername, roomId, sentBy, roomName } = req.body;
            const roomNotification = await notificationService.createRoomNotification(
                sentBy,
                friendUsername,
                roomId,
                roomName,
            );

            return res.json(roomNotification);
        } catch (e) {
            next(e);
        }
    }

    async deleteRoomNotification(req: ITypedRequest<IDeleteNotificationRequest>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { notificationId } = req.body;
            const deletedRoomNotification = await notificationService.deleteRoomNotification(notificationId);

            return res.json(deletedRoomNotification);
        } catch (e) {
            next(e);
        }
    }
}

export const notificationController = new NotificationController();
