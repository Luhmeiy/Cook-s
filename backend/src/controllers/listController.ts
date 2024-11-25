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
		bought?: boolean | null;
	}>;
	listType: "ingredient" | "shopping";
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

		list.forEach(async (ingredient) => {
			const result = await Promise.all(
				user[`${listType}List`].map(async (userIngredient) => {
					const result =
						userIngredient.ingredient.toLowerCase() ===
							ingredient.ingredient.toLowerCase() &&
						userIngredient.unit.toLowerCase() ===
							ingredient.unit.toLowerCase();

					if (result) {
						await User.updateOne(
							{
								_id: id,
								[`${listType}List._id`]: userIngredient._id,
							},
							{
								$set: {
									[`${listType}List.$`]: {
										...userIngredient.toObject(),
										quantity:
											userIngredient.quantity +
											ingredient.quantity,
									},
								},
							}
						);
					}

					return result;
				})
			);

			if (!result.includes(true)) {
				if (!("bought" in ingredient) && listType === "shopping") {
					ingredient.bought = false;
				}

				user[`${listType}List`].push(ingredient);
			}
		});

		await user.save();

		res.json({ message: `Ingredients added to list.` });
	}
);

export const updateList = expressAsyncHandler(
	async (
		req: Request<
			{ userId: string; ingredient: string },
			{},
			{
				updatedIngredient: {
					ingredient: string;
					quantity: number;
					unit: string;
					bought?: boolean;
				};
			}
		>,
		res
	) => {
		const { userId, ingredient } = req.params;
		const { updatedIngredient } = req.body;

		if (!userId || !ingredient || !updatedIngredient) {
			res.status(400);
			throw new Error("All fields are required.");
		}

		const user = await User.findById(userId);

		if (!user) {
			res.status(400);
			throw new Error("User not found.");
		}

		if (
			user.ingredientList.some(({ _id }) => _id.toString() === ingredient)
		) {
			await User.updateOne(
				{ _id: userId, "ingredientList._id": ingredient },
				{ $set: { "ingredientList.$": updatedIngredient } }
			);
		} else if (
			user.shoppingList.some(({ _id }) => _id.toString() === ingredient)
		) {
			await User.updateOne(
				{ _id: userId, "shoppingList._id": ingredient },
				{ $set: { "shoppingList.$": updatedIngredient } }
			);
		}

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
