import expressAsyncHandler from "express-async-handler";
import Recipe from "@/models/Recipe";

export const getRecipes = expressAsyncHandler(async (req, res) => {
	const recipes = await Recipe.find({ public: true }).exec();

	if (!recipes.length) {
		res.status(400).json({ message: "No recipe found." });
		return;
	}

	res.status(200).json({ recipes });
});

export const getRecipeById = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;

	const recipe = await Recipe.findById(id).exec();

	if (!recipe) {
		res.status(400).json({ message: "No recipe found." });
		return;
	}

	res.status(200).json({ recipe });
});

export const getUserRecipes = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ message: "User ID required." });
		return;
	}

	const recipes = await Recipe.find({ userId: id }).exec();

	if (!recipes.length) {
		res.status(400).json({ message: "No recipe found." });
		return;
	}

	res.status(200).json({ recipes });
});

export const createRecipe = expressAsyncHandler(async (req, res) => {
	const { data } = req.body;

	const duplicate = await Recipe.findOne({
		name: data.name,
		"createdBy._id": data.userId,
	});

	if (duplicate) {
		res.status(400).json({ message: "Recipe already exists." });
		return;
	}

	try {
		const recipe = await Recipe.create(data);

		res.status(201).json({
			message: `New recipe ${recipe.name} created.`,
		});
	} catch (error) {
		res.status(400).json({ message: "Failed to save recipe." });
	}
});

export const updateRecipe = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;
	const { data } = req.body;

	if (!id) {
		res.status(400).json({ message: "Recipe ID required." });
		return;
	}

	data._id = id;

	try {
		const updatedRecipe = await Recipe.findByIdAndUpdate(id, data);

		if (updatedRecipe) {
			res.status(200).json({
				message: `Recipe ${updatedRecipe.name} updated.`,
			});
		}
	} catch (error) {
		res.status(400).json({ message: "Failed to update recipe." });
	}
});

export const deleteRecipe = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ message: "Recipe ID required." });
		return;
	}

	try {
		const deletedRecipe = await Recipe.findByIdAndDelete(id);

		if (deletedRecipe) {
			res.status(200).json({
				message: `Recipe ${deletedRecipe.name} deleted.`,
			});
		}
	} catch (error) {
		res.status(400).json({ message: "Failed to delete recipe." });
	}
});
