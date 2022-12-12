import { IAuthValues } from "./../auth/interfaces.js";
import { MAX_AGE } from "../auth/auth.constants.js";
import { authService } from "../auth/auth.service.js";
import { Request, Response } from "express";

interface IRegisterRequest<T> extends Request {
    body: T;
}

class UserController {
    async register(req: IRegisterRequest<IAuthValues>, res: Response) {
        try {
            const { email, password } = req.body;
            const registeredUser = await authService.register(email, password);

            res.cookie("refreshToken", registeredUser.refreshToken, {
                maxAge: MAX_AGE.THIRTY_DAYS,
                httpOnly: true,
            });
            return res.json(registeredUser);
        } catch (e) {
            console.log(e);
        }
    }
}

export const userController = new UserController();
