import { User } from "./user.entity.js";
import { AppDataSource } from "../db/database.js";

class UserService {
    async createUser(email: string, username: string, password: string): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.create({ email, username, password });
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
}

export const userService = new UserService();
