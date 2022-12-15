import { UserDto } from "./../user/user.dto.js";
import { IRegisteredUser } from "./interfaces.js";
import { userService } from "./../user/user.service.js";
import bcrypt from "bcrypt";
import { jwtService } from "./jwt.service.js";
import { ErrorException } from "../error-handler/error-exception.js";

class AuthService {
    async register(userDto: UserDto): Promise<IRegisteredUser> {
        const candidate = await userService.getUserByEmail(userDto.email);

        if (candidate) {
            throw ErrorException.BadRequest(`User with email: ${userDto.email} already registered`);
        }

        const hashedPassword = await this.createHashedPassword(userDto.password);

        const user = await userService.createUser(userDto.email, hashedPassword);

        const token = await jwtService.generateTokens(user);

        return {
            id: user.id,
            email: user.email,
            token: token,
        };
    }

    async login(userDto: UserDto): Promise<IRegisteredUser> {
        const user = await userService.getUserByEmail(userDto.email);

        if (!user) {
            throw ErrorException.BadRequest(`User with email: ${userDto.email} was not found`);
        }

        const isPassEqual = await bcrypt.compare(userDto.password, user.password);
        if (!isPassEqual) {
            throw ErrorException.BadRequest(`Incorrect password`);
        }

        const token = await jwtService.generateTokens(user);

        return {
            id: user.id,
            email: user.email,
            token: token,
        };
    }

    async createHashedPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const authService = new AuthService();
