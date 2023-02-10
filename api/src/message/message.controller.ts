import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { messageService } from "./message.service.js";
import { MessageDto } from "./message.dto.js";

interface ITypedRequest<T> extends Request {
    body: T;
}

class MessageController {
    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const messages = await messageService.getUserMessages(user);

            return res.json(messages);
        } catch (e) {
            next(e);
        }
    }

    async sendMessage(req: ITypedRequest<MessageDto>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const messageDto = req.body;
            const message = await messageService.createMessage(messageDto, user);

            return res.json(message);
        } catch (e) {
            next(e);
        }
    }

    async deleteMessages(req: ITypedRequest<MessageDto[]>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const messages = req.body;
            const deletedMessages = await messageService.deleteMessages(messages);

            return res.json(deletedMessages);
        } catch (e) {
            next(e);
        }
    }
}

export const messageController = new MessageController();
