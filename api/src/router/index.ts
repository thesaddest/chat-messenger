import { Router } from "express";
import { userController } from "../user/user.controller.js";
import { friendController } from "../friend/friend.controller.js";
import { messageController } from "../message/message.controller.js";
import { fileController } from "../file/file.controller.js";
import { multerUploadMiddleware } from "../libs/multer-s3.js";
import { roomController } from "../room/room.controller.js";
import { notificationController } from "../notification/notification.controller.js";

export const router = Router();

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

router.get("/friend/friends", friendController.getFriends);
router.post("/friend/friend", friendController.addFriend);
router.get("/friend/search", friendController.getFriendsBySearchQuery);

router.get("/message/messages", messageController.getMessages);
router.post("/message/message", messageController.sendMessage);
router.delete("/message/delete", messageController.deleteMessages);
router.post("/message/read", messageController.readMessages);
router.post("/message/forward", messageController.forwardMessages);
router.post("/message/reply", messageController.replyToMessage);
router.post("/message/hide", messageController.hideMessage);
router.post("/message/reveal-hidden-message", messageController.revealHiddenMessage);

router.post("/file/upload-single-file", multerUploadMiddleware.single("file"), fileController.uploadSingleFile);

router.post("/room/create-room", roomController.createRoom);
router.get("/room/rooms", roomController.getRooms);
router.post("/room/invite-friend-to-join-room", roomController.inviteFriendToJoinRoom);
router.post("/room/accept-invite-to-join-room", roomController.acceptInviteToJoinRoom);

router.get("/notification/room-notifications", notificationController.getAllRoomNotifications);
router.post("/notification/create-room-notification", notificationController.createRoomNotification);
router.delete("/notification/delete-room-notification", notificationController.deleteRoomNotification);
