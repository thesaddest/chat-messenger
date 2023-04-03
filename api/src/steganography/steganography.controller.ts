import { NextFunction, Request, Response } from "express";
import { steganographyService } from "./steganography.service.js";
import { userService } from "../user/user.service.js";
import { ErrorException } from "../error-handler/error-exception.js";

class SteganographyController {
    async revealMessage(req: Request, res: Response, next: NextFunction) {
        try {
            // const user = await userService.getUserFromAuthHeaders(req.headers.authorization);
            //
            // if (!user) {
            //     return next(ErrorException.UnauthorizedError());
            // }
            // TODO: change to dynamic;
            const { s3Link } = req.body;

            const result = await steganographyService.revealMessage(s3Link);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const steganographyController = new SteganographyController();
