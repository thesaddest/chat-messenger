import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { messageService } from "./message.service.js";
import { MessageDto } from "./message.dto.js";

interface ISendMessageRequest<T> extends Request {
    body: T;
}

class MessageController {
    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return ErrorException.UnauthorizedError();
            }

            const messages = await messageService.getUserMessages(user);
            return res.json(messages);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async sendMessage(req: ISendMessageRequest<MessageDto>, res: Response, next: NextFunction) {
        try {
            const messageDto = req.body;
            const message = await messageService.createMessage(messageDto);

            return res.json({ to: message.to, from: message.from, content: message.content });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

export const messageController = new MessageController();