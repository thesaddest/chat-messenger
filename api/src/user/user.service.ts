import { User } from "./user.entity.js";
import { AppDataSource } from "../db/database.js";
import { jwtService } from "../auth/jwt.service.js";

class UserService {
    async createUser(userId: string, email: string, username: string, password: string): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.create({ userId, email, username, password });
        await userRepository.save(user);

        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        return await userRepository.findOne({ where: { email } });
    }

    async getUserByUsername(username: string): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        return await userRepository.findOne({ where: { username } });
    }

    async getUserFromAuthHeaders(authorizationHeader: string): Promise<User> {
        const bearerToken = authorizationHeader.split(" ")[1];
        const decodedPayload = await jwtService.decodeBearerToken(bearerToken);

        return await userService.getUserByEmail(decodedPayload.payload.email);
    }

    async getUsernameByUserId(id: string): Promise<string> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { userId: id } });

        return user.username;
    }
}

export const userService = new UserService();
