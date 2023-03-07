import { NextFunction, Request, Response } from "express";
import Busboy from "busboy";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { fileService } from "./file.service.js";
import { s3Service } from "../s3/s3.service.js";

class FileController {
    async uploadSingleFile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const file = req.file as Express.MulterS3.File;
            const uploadedFiles = await fileService.uploadSingleFile(file, user);

            res.json(uploadedFiles);
        } catch (e) {
            next(e);
        }
    }

    async deleteSingleFile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const file = req.file as Express.MulterS3.File;
            const deletedFiles = await fileService.deleteSingleFile(file, user);

            res.json(deletedFiles);
        } catch (e) {
            next(e);
        }
    }

    async testUpload(req: Request, res: Response, next: NextFunction) {
        try {
            const busboy = Busboy({ headers: req.headers });
            busboy.on("file", async (name, file, info) => {
                const uploadId = await s3Service.getMultipartUploadId(info.filename);
                const dataToUpload: any[] = [];
                const uploadResults: any[] = [];
                file.on("data", async (data: Buffer) => {
                    dataToUpload.push(data);
                });
                file.on("close", async () => {
                    console.log(dataToUpload);
                    for (let i = 0; i < dataToUpload.length; i++) {
                        uploadResults.push(await s3Service.uploadPartData(dataToUpload[i], info.filename, uploadId, i));
                    }
                    return await s3Service.completeMultipartUpload(uploadResults, info.filename, uploadId);
                });
            });
            // const testUpload = await s3Service.createMultipartUpload("shit");
            // res.json(testUpload);

            req.pipe(busboy);
        } catch (e) {
            next(e);
        }
    }
}

export const fileController = new FileController();
