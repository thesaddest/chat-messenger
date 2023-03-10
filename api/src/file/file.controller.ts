import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { fileService } from "./file.service.js";

class FileController {
    async uploadSingleFile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const sentTo = req.headers.sentto as string;
            const file = req.file as Express.MulterS3.File;

            const uploadedFiles = await fileService.uploadSingleFile(file, user, sentTo);

            res.json(uploadedFiles);
        } catch (e) {
            next(e);
        }
    }
}

export const fileController = new FileController();
