import { Router } from "express";
import {
	createRecipe,
	deleteRecipe,
	getRecipeById,
	getRecipes,
	getUserRecipes,
	updateRecipe,
} from "@/controllers/recipeController";
import { verifyJWT } from "@/middleware/verifyJWT";

export const router = Router();

router.route("/").get(getRecipes);
router.route("/:id").get(getRecipeById);
router.route("/user/:id").get(getUserRecipes);

router.use(verifyJWT);
router.route("/").post(createRecipe);
router.route("/:id").patch(updateRecipe).delete(deleteRecipe);
