import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Friend } from "../friend/friend.entity.js";
import { User } from "../user/user.entity.js";
import { Message } from "../message/message.entity.js";
import { File } from "../file/file.entity.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Friend, Message, File],
    synchronize: true,
    logging: false,
});
