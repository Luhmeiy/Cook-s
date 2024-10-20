import { Router } from "express";
import {
	addToList,
	deleteFromList,
	updateList,
} from "@/controllers/listController";
import { verifyJWT } from "@/middleware/verifyJWT";

export const router = Router();

router.use(verifyJWT);
router.route("/").post(addToList).patch(updateList).delete(deleteFromList);
