import { Router } from "express";
import { deleteUser, getUser, updateUser } from "@/controllers/userController";

export const router = Router();

router.route("/").get(getUser).patch(updateUser).delete(deleteUser);
