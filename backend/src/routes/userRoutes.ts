import { Router } from "express";
import { deleteUser, getUser, updateUser } from "@/controllers/userController";
import { verifyJWT } from "@/middleware/verifyJWT";

export const router = Router();

router.route("/:id/:userId").get(getUser);

router.use(verifyJWT);
router.route("/:id").patch(updateUser);
router.route("/:id/:password").delete(deleteUser);
