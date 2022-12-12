import { User } from "../user/user.entity.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db/database.js";
import { IJWTokens } from "./interfaces.js";
import { Token } from "./token.entity.js";

class JWTService {
    async generateTokens(payload: User): Promise<IJWTokens> {
        const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

        return { accessToken, refreshToken };
    }

    async saveRefreshToken(user: User, refreshToken: string): Promise<Token> {
        const tokenRepository = AppDataSource.getRepository(Token);
        const tokenData = await tokenRepository.findOne({ where: { id: user.id } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenRepository.create({ user, refreshToken });

        await tokenRepository.save(token);

        return token;
    }
}

export const jwtService = new JWTService();
