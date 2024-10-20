import { Router } from "express";
import { login, logout, refresh } from "@/controllers/authController";

export const router = Router();

router.route("/").post(login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);
