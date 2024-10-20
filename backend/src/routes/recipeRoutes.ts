import { Router } from "express";
import {
	createRecipe,
	deleteRecipe,
	getRecipes,
	updateRecipe,
} from "@/controllers/recipeController";
import { verifyJWT } from "@/middleware/verifyJWT";

export const router = Router();

router.use(verifyJWT);

router
	.route("/")
	.get(getRecipes)
	.post(createRecipe)
	.patch(updateRecipe)
	.delete(deleteRecipe);
