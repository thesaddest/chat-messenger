import jwt, { JwtPayload } from "jsonwebtoken";

interface JWTPayload {
    email: string;
    password: string;
}

interface JWTUserPayload extends JwtPayload {
    payload: JWTPayload;
}

class JWTService {
    async generateTokens(payload: JWTPayload): Promise<string> {
        return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "30m" });
    }

    async decodeBearerToken(bearerToken: string): Promise<JWTUserPayload> {
        return jwt.decode(bearerToken) as JWTUserPayload;
    }
}

export const jwtService = new JWTService();
