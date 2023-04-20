import { User } from "./user.entity.js";
import { AppDataSource } from "../db/database.js";
import { jwtService } from "../auth/jwt.service.js";
import { fileService } from "../file/file.service.js";

class UserService {
    async createUser(
        userId: string,
        email: string,
        username: string,
        password: string,
        deviceId: string,
    ): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.create({ userId, email, username, password, deviceId });
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

    async setNewDeviceIdForUser(userId: string, deviceId: string): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.update({ userId: userId }, { deviceId: deviceId });
        return await userRepository.findOne({ where: { userId: userId } });
    }

    async getDeviceIdByUserId(userId: string): Promise<string> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { userId: userId } });

        return user.deviceId;
    }

    async changeAvatar(user: User, avatarFile: Express.MulterS3.File): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const uploadedFile = await fileService.uploadSingleFile(avatarFile, user);

        await userRepository.update({ userId: user.userId }, { avtarPath: uploadedFile.location });
        return await userRepository.findOne({ where: { userId: user.userId } });
    }
}

export const userService = new UserService();
