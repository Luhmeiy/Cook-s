import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User";

export const getUser = expressAsyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400);
		throw new Error("User ID required.");
	}

	const user = await User.findById(id).exec();

	if (!user) {
		res.status(400);
		throw new Error("User not found.");
	}

	res.json(user);
});

export const createUser = expressAsyncHandler(async (req, res) => {
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		res.status(400);
		throw new Error("All fields are required.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const userObject = {
		email,
		username,
		password: hashedPassword,
		ingredientList: [],
		shoppingList: [],
	};

	const user = await User.create(userObject);

	if (user) {
		res.status(201).json({
			message: `New user ${user.username} created.`,
		});
	} else {
		res.status(400).json({ message: "Invalid user data received." });
	}
});

export const updateUser = expressAsyncHandler(async (req, res) => {
	const { id, data } = req.body;

	if (!id || !data) {
		res.status(400);
		throw new Error("All fields are required.");
	}

	if (data.password) {
		data.password = await bcrypt.hash(data.password, 10);
	}

	const updatedUser = await User.findByIdAndUpdate(id, data).select(
		"username"
	);

	if (!updatedUser) {
		res.status(400);
		throw new Error("User not found.");
	}

	res.json({ message: `User ${updatedUser.username} updated.` });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400);
		throw new Error("User ID required.");
	}

	const deletedUser = await User.findByIdAndDelete(id).select("username");

	if (!deletedUser) {
		res.status(400);
		throw new Error("User not found.");
	}

	res.json({
		message: `User ${deletedUser.username} deleted.`,
	});
});
