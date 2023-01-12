import { Socket } from "socket.io";
import { NextFunction } from "express";
import { ErrorException } from "../error-handler/error-exception.js";

export const socketAuthMiddleware = async (socket: Socket, next: NextFunction) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(ErrorException.UnauthorizedError());
    }
    next();
};
