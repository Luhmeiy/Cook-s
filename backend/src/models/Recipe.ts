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
			unit: {
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
	public: {
		type: Boolean,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdBy: {
		_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
	},
});

export default model("Recipe", recipeSchema);
