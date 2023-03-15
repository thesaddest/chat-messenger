import {
    getFriends,
    onDeInitUser,
    sendMessage,
    getMessages,
    onInitUser,
    deleteMessages,
    readMessages,
    forwardMessages,
    replyToMessage,
    createRoom,
    getRooms,
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
import { SOCKET_EVENTS } from "./socket/socket.constants.js";
import { socketAuthMiddleware } from "./socket/socket.middleware.js";
import { MessageDto } from "./message/message.dto.js";
import { RoomDto } from "./room/room.dto.js";

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
    getMessages(socket);
    getRooms(socket);

    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (messageDto: MessageDto) => {
        sendMessage(socket, messageDto);
    });

    socket.on(SOCKET_EVENTS.DELETE_MESSAGES, (messageDtos: MessageDto[]) => {
        deleteMessages(socket, messageDtos);
    });

    socket.on(SOCKET_EVENTS.READ_MESSAGES, (messageDtos: MessageDto[]) => {
        readMessages(socket, messageDtos);
    });

    socket.on(SOCKET_EVENTS.FORWARD_MESSAGES, (messageDtos: MessageDto[]) => {
        forwardMessages(socket, messageDtos);
    });

    socket.on(SOCKET_EVENTS.REPLY_TO_MESSAGE, (messageDto: MessageDto) => {
        replyToMessage(socket, messageDto);
    });

    socket.on(SOCKET_EVENTS.CREATE_ROOM, (roomDto: RoomDto) => {
        createRoom(socket, roomDto);
    });

    socket.on(SOCKET_EVENTS.ON_DISCONNECT, () => {
        onDeInitUser(socket);
    });
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});
