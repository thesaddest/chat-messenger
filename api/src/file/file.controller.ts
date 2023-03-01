import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { fileService } from "./file.service.js";
import { MessageDto } from "../message/message.dto.js";
import { messageService } from "../message/message.service.js";
import { FileDto } from "./file.dto.js";

interface ISendMessageWithFilesPayload {
    newMessage: MessageDto;
    attachedFiles: FileDto[];
}

interface ITypedRequest<T> extends Request {
    body: T;
}

class FileController {
    async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            // const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            // if (!user) {
            //     return next(ErrorException.UnauthorizedError());
            // }
            const { newMessage } = req.body;
            console.log("newMessage", newMessage);
            const files = req.files as Express.MulterS3.File[];
            console.log("files: ", files);

            // const uploadedFiles = await fileService.uploadFiles(files, user);
            // const messageWithUploadedFiles = await messageService.sendMessageWithFile(newMessage, uploadedFiles, user);

            // res.json(messageWithUploadedFiles);
        } catch (e) {
            next(e);
        }
    }
}

export const fileController = new FileController();
