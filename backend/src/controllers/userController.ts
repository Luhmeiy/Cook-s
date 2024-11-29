import bcrypt, { compare } from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import User from "@/models/User";

export const getUser = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;

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

export const updateUser = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;
	const { data } = req.body;

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
	const { id, password } = req.params;

	if (!id || !password) {
		res.status(400);
		throw new Error("User ID and password required.");
	}

	const user = await User.findById(id).exec();

	if (!user) {
		res.status(401);
		throw new Error("User not found.");
	}

	const match = await compare(password, user.password);

	if (!match) {
		res.status(401);
		throw new Error("Wrong password.");
	}

	const deletedUser = await User.findByIdAndDelete(id).select("username");

	if (!deletedUser) {
		res.status(400);
		throw new Error("User not found.");
	}

	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.status(204);
		throw new Error("No cookie found.");
	}

	res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

	res.json({
		message: `User ${deletedUser.username} deleted.`,
	});
});
