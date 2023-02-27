import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { fileService } from "./file.service.js";

class FileController {
    async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const files = req.files as Express.Multer.File[];

            const uploadedFiles = await fileService.uploadFiles(files, user);

            console.log(uploadedFiles);
        } catch (e) {
            next(e);
        }
    }
}

export const fileController = new FileController();
