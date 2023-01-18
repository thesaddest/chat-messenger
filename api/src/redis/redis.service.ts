import { redisClient } from "./index.js";

export class RedisService {
    async getFriendConnectedStatusByUsername(username: string): Promise<boolean> {
        const connected = await redisClient.hget(`username:${username}`, "connected");

        return (connected === null || connected === "false") ? false : Boolean(connected);
    }
}

export const redisService = new RedisService();