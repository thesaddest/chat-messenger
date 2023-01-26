import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { friendService } from "./friend.service.js";
import { IAddFriendValues } from "./interfaces.js";

interface IAddFriendRequest<T> extends Request {
    body: T;
}

class FriendController {
    async getFriends(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            let { skip } = req.query;
            // @ts-ignore
            skip = skip || 0;

            // @ts-ignore
            const userFriends = await friendService.getUserFriendsWithLimit(user, skip);
            const friends = await friendService.getConnectedFriends(userFriends);

            return res.json(friends);
        } catch (e) {
            next(e);
        }
    }

    async addFriend(req: IAddFriendRequest<IAddFriendValues>, res: Response, next: NextFunction) {
        try {
            const { username } = req.body;
            const existingUser = await userService.getUserByUsername(username);

            if (!existingUser) {
                return next(ErrorException.BadRequest("User doesn't exists"));
            }

            const currentUser = await userService.getUserFromAuthHeaders(req.headers.authorization);
            const existingFriend = await friendService.hasFriend(currentUser, username);

            if (existingFriend) {
                return next(ErrorException.BadRequest("This user has already been added to your friends list"));
            }

            if (currentUser.username === username) {
                return next(ErrorException.BadRequest("You can not add your self"));
            }

            const newFriend = await friendService.createFriend(username);
            const addedFriend = await friendService.addFriend(newFriend, currentUser);

            return res.json(addedFriend);
        } catch (e) {
            next(e);
        }
    }
}

export const friendController = new FriendController();
