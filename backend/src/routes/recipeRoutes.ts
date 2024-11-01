import { Router } from "express";
import {
	createRecipe,
	deleteRecipe,
	getRecipes,
	getUserRecipes,
	updateRecipe,
} from "@/controllers/recipeController";
import { verifyJWT } from "@/middleware/verifyJWT";

export const router = Router();

router.route("/").get(getRecipes);
router.route("/:id").get(getUserRecipes);

router.use(verifyJWT);
router.route("/").post(createRecipe).patch(updateRecipe).delete(deleteRecipe);
