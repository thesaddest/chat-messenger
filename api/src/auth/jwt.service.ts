import { User } from "../user/user.entity.js";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JWTUserPayload extends JwtPayload {
    payload: User;
}

class JWTService {
    async generateTokens(payload: User): Promise<string> {
        return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "30m" });
    }

    async decodeBearerToken(bearerToken: string): Promise<JWTUserPayload> {
        return jwt.decode(bearerToken) as JWTUserPayload;
    }
}

export const jwtService = new JWTService();
