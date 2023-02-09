import { Router } from "express";
import { userController } from "../user/user.controller.js";
import { friendController } from "../friend/friend.controller.js";
import { messageController } from "../message/message.controller.js";

export const router = Router();

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

router.get("/friend/getFriends", friendController.getFriends);
router.post("/friend/addFriend", friendController.addFriend);
router.get("/friend/getFriendsBySearchQuery", friendController.getFriendsBySearchQuery);

router.get("/message/getMessages", messageController.getMessages);
router.post("/message/sendMessage", messageController.sendMessage);
router.post("/message/deleteMessages", messageController.deleteMessages);
