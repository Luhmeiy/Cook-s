import { model, Schema } from "mongoose";

const recipeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
	},
	prepTime: {
		type: String,
		required: true,
	},
	servings: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	ingredients: [
		{
			ingredient: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			quantityType: {
				type: String,
				required: true,
			},
		},
	],
	instructions: [
		{
			type: String,
			required: true,
		},
	],
	favorite: {
		type: Boolean,
		required: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export default model("Recipe", recipeSchema);
