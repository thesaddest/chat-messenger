import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { messageService } from "./message.service.js";
import { MessageDto } from "./message.dto.js";

interface ITypedRequest<T> extends Request {
    body: T;
}

interface IForwardMessagesPayload {
    messages: MessageDto[];
    from: string;
    to: string;
}

interface IReplyToMessagePayload {
    newMessage: MessageDto;
    repliedMessage: MessageDto;
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

    async readMessages(req: ITypedRequest<MessageDto[]>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const messages = req.body;
            const readMessages = await messageService.readMessages(messages);

            return res.json(readMessages);
        } catch (e) {
            next(e);
        }
    }

    async forwardMessages(req: ITypedRequest<IForwardMessagesPayload>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { messages, from, to } = req.body;
            const forwardedMessages = await messageService.forwardMessages(messages, user, from, to);

            return res.json(forwardedMessages);
        } catch (e) {
            next(e);
        }
    }

    async replyToMessage(req: ITypedRequest<IReplyToMessagePayload>, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const { newMessage, repliedMessage } = req.body;
            const createdRepliedMessage = await messageService.replyToMessage(newMessage, repliedMessage, user);

            return res.json(createdRepliedMessage);
        } catch (e) {
            next(e);
        }
    }
}

export const messageController = new MessageController();
