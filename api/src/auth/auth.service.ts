import { UserDto } from "./../user/user.dto.js";
import { IRegisteredUser } from "./interfaces.js";
import { userService } from "./../user/user.service.js";
import bcrypt from "bcrypt";
import { jwtService } from "./jwt.service.js";

class AuthService {
    async register(userDto: UserDto): Promise<IRegisteredUser> {
        const candidate = await userService.getUserByEmail(userDto.email);

        if (candidate) {
            throw new Error(`User with email: ${userDto.email} already registered`);
        }

        const hashedPassword = await this.createHashedPassword(userDto.password);

        const user = await userService.createUser(userDto.email, hashedPassword);

        const tokens = await jwtService.generateTokens(user);
        await jwtService.saveRefreshToken(user, tokens.refreshToken);

        return {
            id: user.id,
            email: user.email,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async createHashedPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const authService = new AuthService();
