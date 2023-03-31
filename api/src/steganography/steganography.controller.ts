import { NextFunction, Request, Response } from "express";
import { steganographyService } from "./steganography.service.js";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";

class SteganographyController {
    async embedMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }

            const result = await steganographyService.embedMessage("TEST");
            res.json(result);
        } catch (err) {
            console.error(err);
        }
    }

    async revealMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserFromAuthHeaders(req.headers.authorization);

            if (!user) {
                return next(ErrorException.UnauthorizedError());
            }
            //TODO: change to dynamic;
            const pathToImage = "https://chat-messenger.s3.eu-central-1.amazonaws.com/iis.png";
            const result = await steganographyService.revealMessage(pathToImage);
            res.json(result);
        } catch (err) {
            console.error(err);
        }
    }
}

export const steganographyController = new SteganographyController();
