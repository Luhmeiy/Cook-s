import { model, Schema } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	public: {
		type: Boolean,
		required: true,
	},
	confirmed: {
		type: Boolean,
		required: true,
	},
	ingredientList: [
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
	shoppingList: [
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
			bought: {
				type: Boolean,
			},
		},
	],
});

export default model("User", userSchema);
