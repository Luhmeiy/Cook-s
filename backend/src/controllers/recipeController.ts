import expressAsyncHandler from "express-async-handler";
import Recipe from "@/models/Recipe";

export const getRecipes = expressAsyncHandler(async (req, res) => {
	const recipes = await Recipe.find({ public: true }).exec();

	if (!recipes.length) {
		res.status(400);
		throw new Error("Recipes not found.");
	}

	res.json({ recipes });
});

export const getUserRecipes = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400);
		throw new Error("User ID required.");
	}

	const recipes = await Recipe.find({
		$or: [{ userId: id }, { "createdBy._id": id }],
	}).exec();

	if (!recipes.length) {
		res.status(400);
		throw new Error("Recipes not found.");
	}

	res.json({ recipes });
});

export const createRecipe = expressAsyncHandler(async (req, res) => {
	const { data } = req.body;

	const duplicate = await Recipe.findOne({
		name: data.name,
		"createdBy._id": data.userId,
	});

	if (!duplicate) {
		const recipe = await Recipe.create(data);

		if (recipe) {
			res.status(201).json({
				message: `New recipe ${recipe.name} created.`,
			});
		} else {
			res.status(400).json({ error: "Invalid recipe data received." });
		}
	} else {
		res.status(400).json({ error: "Recipe already exists." });
	}
});

export const updateRecipe = expressAsyncHandler(async (req, res) => {
	const { id, data } = req.body;

	if (!id) {
		res.status(400);
		throw new Error("Recipe ID required.");
	}

	const updatedRecipe = await Recipe.findByIdAndUpdate(id, data);

	if (!updatedRecipe) {
		res.status(400);
		throw new Error("Recipe not found.");
	}

	res.status(200).json({ message: `Recipe ${updatedRecipe.name} updated.` });
});

export const deleteRecipe = expressAsyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400);
		throw new Error("Recipe ID required.");
	}

	const deletedRecipe = await Recipe.findByIdAndDelete(id);

	if (!deletedRecipe) {
		res.status(400);
		throw new Error("Recipe not found.");
	}

	res.status(200).json({ message: `Recipe ${deletedRecipe.name} deleted.` });
});
