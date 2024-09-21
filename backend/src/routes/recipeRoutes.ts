import { Router } from "express";
import {
	createRecipe,
	deleteRecipe,
	getRecipes,
	updateRecipe,
} from "../controllers/recipeController";

export const router = Router();

router
	.route("/")
	.get(getRecipes)
	.post(createRecipe)
	.patch(updateRecipe)
	.delete(deleteRecipe);
