import { UserDto } from "./user.dto.js";
import { IAuthValues } from "./../auth/interfaces.js";
import { authService } from "../auth/auth.service.js";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { ErrorException } from "../error-handler/error-exception.js";

interface IAuthRequest<T> extends Request {
    body: T;
}

class UserController {
    async register(req: IAuthRequest<IAuthValues>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const newUser = new UserDto();
            newUser.email = email;
            newUser.password = password;

            const errors = await validate(newUser);

            if (errors.length) {
                return next(ErrorException.BadRequest("Email or password validation error", errors));
            }

            const registeredUser = await authService.register(newUser);

            return res.json(registeredUser);
        } catch (e) {
            next(e);
        }
    }

    async login(req: IAuthRequest<IAuthValues>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const userData = new UserDto();
            userData.email = email;
            userData.password = password;

            const loginedUser = await authService.login(userData);

            return res.json(loginedUser);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
