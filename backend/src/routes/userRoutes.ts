import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/userController";

export const router = Router();

router
	.route("/")
	.get(getUser)
	.post(createUser)
	.patch(updateUser)
	.delete(deleteUser);
