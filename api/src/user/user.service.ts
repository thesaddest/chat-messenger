import { User } from "./user.entity.js";
import { AppDataSource } from "../db/database.js";

class UserService {
    async createUser(email: string, password: string): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.create({ email, password });
        await userRepository.save(user);

        return user;
    }

    async getUserByEmail(email: string) {
        const userRepository = AppDataSource.getRepository(User);

        return userRepository.findOne({ where: { email } });
    }
}

export const userService = new UserService();
