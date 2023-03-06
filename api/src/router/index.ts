import { Router } from "express";
import { userController } from "../user/user.controller.js";
import { friendController } from "../friend/friend.controller.js";
import { messageController } from "../message/message.controller.js";
import { fileController } from "../file/file.controller.js";
import { multerUploadMiddleware } from "../libs/multer.js";

export const router = Router();

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

router.get("/friend/friends", friendController.getFriends);
router.post("/friend/friend", friendController.addFriend);
router.get("/friend/search", friendController.getFriendsBySearchQuery);

router.get("/message/messages", messageController.getMessages);
router.post("/message/message", messageController.sendMessage);
router.post("/message/delete", messageController.deleteMessages);
router.post("/message/read", messageController.readMessages);
router.post("/message/forward", messageController.forwardMessages);
router.post("/message/reply", messageController.replyToMessage);

router.post("/file/upload-single-file", multerUploadMiddleware.single("file"), fileController.uploadSingleFile);
