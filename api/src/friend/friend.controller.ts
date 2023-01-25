//@ts-nocheck
import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { friendService } from "./friend.service.js";

class FriendController {
    async getFriends(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return ErrorException.UnauthorizedError();
            }

            let { skip } = req.query;
            skip = skip || 0;

            const userFriends = await friendService.getUserFriendsWithLimit(user, skip);
            const friends = await friendService.getConnectedFriends(userFriends);

            return res.json(friends);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

export const friendController = new FriendController();
