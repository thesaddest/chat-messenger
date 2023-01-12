import {
    addFriend,
    getFriends,
    onInitUser,
    onDeinitUser,
    sendMessage,
} from "./socket/socket.controller.js";
import express from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";
import { AppDataSource } from "./db/database.js";
import { router } from "./router/index.js";
import { errorMiddleware } from "./error-handler/error.middleware.js";
import { AddFriendCB } from "./socket/interfaces.js";
import { SOCKET_EVENTS } from "./socket/socket.constants.js";
import { Message } from "./message/message.entity.js";
import { socketAuthMiddleware } from "./socket/socket.middleware.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL, credentials: true } });
app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);
app.use("/api", router);
app.use(errorMiddleware);

AppDataSource.initialize();


io.use(socketAuthMiddleware);
io.on(SOCKET_EVENTS.ON_CONNECT, (socket: Socket) => {
    onInitUser(socket);
    getFriends(socket);

    socket.on(SOCKET_EVENTS.ADD_FRIEND, async (username: string, cb: AddFriendCB) => {
        await addFriend(username, cb, socket);
        await getFriends(socket);
    });

    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (messageDto: Message) => {
        sendMessage(socket, messageDto);
    });

    socket.on(SOCKET_EVENTS.ON_DISCONNECT, () => {
        onDeinitUser(socket);
    });
});

server.listen(4000, () => {
    console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});
