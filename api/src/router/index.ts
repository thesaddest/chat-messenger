import { Router } from "express";
import { userController } from "../user/user.controller.js";

export const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
