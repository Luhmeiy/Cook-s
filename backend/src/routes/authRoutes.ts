import { Router } from "express";
import {
	forgotPassword,
	login,
	logout,
	refresh,
	register,
	resetPassword,
	verifyEmail,
} from "@/controllers/authController";

export const router = Router();

router.route("/").post(login);
router.route("/register").post(register);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);
