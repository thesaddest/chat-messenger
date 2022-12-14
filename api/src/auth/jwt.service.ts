import { User } from "../user/user.entity.js";
import jwt from "jsonwebtoken";
import { IJWTokens } from "./interfaces.js";

class JWTService {
    async generateTokens(payload: User): Promise<IJWTokens> {
        const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

        return { accessToken, refreshToken };
    }
}

export const jwtService = new JWTService();
