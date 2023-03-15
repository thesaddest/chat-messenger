import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { roomService } from "./room.service.js";

interface ITypedRequest<T> extends Request {
    body: T;
}

interface ICreateRoomRequest {
    roomName: string;
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
}

export const roomController = new RoomController();
