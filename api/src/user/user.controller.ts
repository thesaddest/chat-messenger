import { UserRegisterDto, UserLoginDto } from "./user.dto.js";
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
            const { email, username, password } = req.body;
            const newUser = new UserRegisterDto();
            newUser.email = email;
            newUser.username = username;
            newUser.password = password;
            newUser.deviceId = await authService.generateUniqueDeviceId(req.headers["user-agent"]);

            const errors = await validate(newUser);

            if (errors.length) {
                return next(ErrorException.BadRequest("Email, username or password validation error", errors));
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

            const userData = new UserLoginDto();
            userData.email = email;
            userData.password = password;
            userData.deviceId = await authService.generateUniqueDeviceId(req.headers["user-agent"]);

            const loggedUser = await authService.login(userData);
            return res.json(loggedUser);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
