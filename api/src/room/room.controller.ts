import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { roomService } from "./room.service.js";
import { friendService } from "../friend/friend.service.js";

interface ITypedRequest<T> extends Request {
    body: T;
}

interface ICreateRoomRequest {
    roomName: string;
}

interface IAcceptInviteToJoinRoom {
    username: string;
    roomId: string;
}

interface IInviteFriendToRoomRequest {
    friendUsername: string;
    roomId: string;
    roomName: string;
    sentBy: string;
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

            const { friendUsername, roomId, sentBy } = req.body;
            if (sentBy === friendUsername) {
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

            return res.json(roomWithInvitedFriend);
        } catch (e) {
            next(e);
        }
    }

    async acceptInviteToJoinRoom(req: ITypedRequest<IAcceptInviteToJoinRoom>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { username, roomId } = req.body;

            const joinedRoom = await roomService.acceptInviteToJoinRoom(username, roomId);
            return res.json(joinedRoom);
        } catch (e) {
            next(e);
        }
    }
}

export const roomController = new RoomController();
