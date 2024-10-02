import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyJWT";

export const router = Router();

router.use(verifyJWT);

router
	.route("/")
	.get(getUser)
	.post(createUser)
	.patch(updateUser)
	.delete(deleteUser);
