import express from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import { AppDataSource } from "./db/database.js";
import { router } from "./router/index.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.SOCKET_IO_ORIGIN_URL, credentials: true } });

io.on("connect", (socket) => {
    console.log(socket);
});

app.use(helmet());
app.use(
    cors({
        origin: process.env.SOCKET_IO_ORIGIN_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

AppDataSource.initialize();

app.listen(4000, () => {
    console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});
