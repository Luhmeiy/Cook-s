import expressAsyncHandler from "express-async-handler";
import { Request } from "express";
import { Types } from "mongoose";
import User from "@/models/User";

interface ListBody {
	id: string;
	list: Types.DocumentArray<{
		ingredient: string;
		quantity: number;
		unit: string;
		bought: boolean;
	}>;
	ingredient: string;
	listType: string;
}

export const addToList = expressAsyncHandler(
	async (req: Request<{}, {}, ListBody>, res) => {
		const { id, list, listType } = req.body;

		if (!id || !list.length || !listType) {
			res.status(400);
			throw new Error("All fields are required.");
		}

		const user = await User.findById(id)
			.select({ ingredientList: 1, shoppingList: 1 })
			.exec();

		if (!user) {
			res.status(400);
			throw new Error("User not found.");
		}

		switch (listType) {
			case "ingredient":
				list.forEach((ingredient) => {
					const result = user.ingredientList.some(
						({ ingredient: ingredientName }) =>
							ingredientName === ingredient.ingredient
					);

					if (!result) {
						user.ingredientList.push(ingredient);
					}
				});
				break;
			case "shopping":
				list.forEach((ingredient) => {
					const result = user.shoppingList.some(
						({ ingredient: ingredientName }) =>
							ingredientName === ingredient.ingredient
					);

					if (!result) {
						user.shoppingList.push(ingredient);
					}
				});
				break;
		}

		await user.save();

		res.json({ message: `Ingredients added to list.` });
	}
);

export const updateList = expressAsyncHandler(
	async (req: Request<{}, {}, ListBody>, res) => {
		const { id, list, listType } = req.body;

		if (!id || !Array.isArray(list) || !list.length || !listType) {
			res.status(400);
			throw new Error("All fields are required.");
		}

		const user = await User.findById(id)
			.select({ ingredientList: 1, shoppingList: 1 })
			.exec();

		if (!user) {
			res.status(400);
			throw new Error("User not found.");
		}

		switch (listType) {
			case "ingredient":
				user.ingredientList = list;
				break;
			case "shopping":
				user.shoppingList = list;
				break;
		}

		await user.save();

		res.json({ message: "List updated." });
	}
);

export const deleteFromList = expressAsyncHandler(async (req, res) => {
	const { userId, ingredient } = req.params;

	if (!userId || !ingredient) {
		res.status(400);
		throw new Error("All fields are required.");
	}

	const user = await User.findByIdAndUpdate(userId, {
		$pull: {
			ingredientList: { _id: ingredient },
			shoppingList: { _id: ingredient },
		},
	});

	if (!user) {
		res.status(400);
		throw new Error("User not found.");
	}

	res.json({ message: `Ingredient ${ingredient} deleted.` });
});
