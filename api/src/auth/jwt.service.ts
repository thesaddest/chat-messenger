import { User } from "../user/user.entity.js";
import jwt from "jsonwebtoken";

class JWTService {
    async generateTokens(payload: User): Promise<string> {
        return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "30m" });
    }
}

export const jwtService = new JWTService();
