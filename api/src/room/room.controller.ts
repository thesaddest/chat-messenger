import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { roomService } from "./room.service.js";
import { friendService } from "../friend/friend.service.js";
import { notificationService } from "../notification/notification.service.js";

interface ITypedRequest<T> extends Request {
    body: T;
}

interface ICreateRoomRequest {
    roomName: string;
}

interface IInviteFriendToRoomRequest {
    friendUsername: string;
    roomId: string;
    roomName: string;
}

interface IAddFriendToRoomRequest {
    username: string;
    roomId: string;
}

class RoomController {
    async createRoom(req: ITypedRequest<ICreateRoomRequest>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { roomName } = req.body;

            const createdRoom = await roomService.createRoom(user, roomName);
            res.json(createdRoom);
        } catch (e) {
            next(e);
        }
    }

    async getRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const rooms = await roomService.getUserRooms(user);
            return res.json(rooms);
        } catch (e) {
            next(e);
        }
    }

    async inviteFriendToJoinRoom(req: ITypedRequest<IInviteFriendToRoomRequest>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { friendUsername, roomId, roomName } = req.body;
            if (user.username === friendUsername) {
                return next(ErrorException.BadRequest("You can not add your self"));
            }

            const friend = await friendService.hasFriend(user, friendUsername);
            if (!friend) {
                return next(ErrorException.BadRequest("Friend doesn't exist in your friends list"));
            }

            const isFriendAlreadyInvitedToRoom = await roomService.isFriendAlreadyInvitedToRoom(friend, roomId);
            if (isFriendAlreadyInvitedToRoom) {
                return next(ErrorException.BadRequest("Friend was already invited to this room"));
            }

            const roomWithInvitedFriend = await roomService.inviteFriendToRoom(friend, roomId);
            await notificationService.createRoomNotification(friendUsername, roomId, roomName);

            return res.json(roomWithInvitedFriend);
        } catch (e) {
            next(e);
        }
    }

    async acceptInviteToJoinRoom(req: ITypedRequest<IAddFriendToRoomRequest>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { username, roomId } = req.body;

            const addedFriend = await roomService.addFriendToRoom(username, roomId);
            return res.json(addedFriend);
        } catch (e) {
            next(e);
        }
    }
}

export const roomController = new RoomController();
