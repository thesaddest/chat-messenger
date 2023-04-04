import { UserRegisterDto, UserLoginDto } from "./../user/user.dto.js";
import { IRegisteredUser } from "./interfaces.js";
import { userService } from "./../user/user.service.js";
import bcrypt from "bcrypt";
import { jwtService } from "./jwt.service.js";
import { ErrorException } from "../error-handler/error-exception.js";
import { v4 as uuidv4 } from "uuid";

class AuthService {
    async register(userDto: UserRegisterDto): Promise<IRegisteredUser> {
        const candidate = await userService.getUserByEmail(userDto.email);

        if (candidate) {
            throw ErrorException.BadRequest(`User with email: ${userDto.email} already registered`);
        }

        const candidateUsername = await userService.getUserByUsername(userDto.username);

        if (candidateUsername) {
            throw ErrorException.BadRequest(`User with username: ${userDto.username} already registered`);
        }

        const hashedPassword = await this.createHashedPassword(userDto.password);
        const userId = uuidv4();
        const user = await userService.createUser(
            userId,
            userDto.email,
            userDto.username,
            hashedPassword,
            userDto.deviceId,
        );
        const token = await jwtService.generateTokens(user);

        return {
            userId: user.userId,
            email: user.email,
            username: user.username,
            token: token,
        };
    }

    async login(userDto: UserLoginDto): Promise<IRegisteredUser> {
        const user = await userService.getUserByEmail(userDto.email);

        if (!user) {
            throw ErrorException.BadRequest(`User with email: ${userDto.email} was not found`);
        }

        const isPassEqual = await bcrypt.compare(userDto.password, user.password);
        if (!isPassEqual) {
            throw ErrorException.BadRequest(`Incorrect password`);
        }

        const isDeviceTheSame = userDto.deviceId === user.deviceId;
        if (!isDeviceTheSame) {
            await userService.setNewDeviceIdForUser(user.userId, userDto.deviceId);
        }

        const token = await jwtService.generateTokens({ email: user.email, password: user.password });

        return {
            userId: user.userId,
            email: user.email,
            username: user.username,
            token: token,
        };
    }

    async generateUniqueDeviceId(userAgent: string): Promise<string> {
        return `${uuidv4()}-${userAgent}`;
    }

    async createHashedPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const authService = new AuthService();
