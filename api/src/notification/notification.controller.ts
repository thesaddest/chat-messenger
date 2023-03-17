import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { notificationService } from "./notification.service.js";

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
}

export const notificationController = new NotificationController();
