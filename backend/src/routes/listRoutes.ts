import { Router } from "express";
import {
	addToList,
	deleteFromList,
	updateList,
} from "@/controllers/listController";

export const router = Router();

router.route("/").post(addToList);
router.route("/:userId/:ingredient").patch(updateList).delete(deleteFromList);
