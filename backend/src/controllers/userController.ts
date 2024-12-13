import { compare } from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import User from "@/models/User";

export const getUser = expressAsyncHandler(async (req, res) => {
	const { id, userId } = req.params;

	if (!id || !userId) {
		res.status(400).json({ message: "User ID required." });
		return;
	}

	const user = await User.findById(id).exec();

	if (user && (user.public || user._id.toString() === userId)) {
		res.status(200).json(user);
	} else {
		res.status(400).json({ message: "User not found." });
	}
});

export const updateUser = expressAsyncHandler(async (req, res) => {
	const { id } = req.params;
	const { data } = req.body;

	if (!id || !data) {
		res.status(400).json({ message: "All fields are required." });
		return;
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(id, data).select(
			"username"
		);

		if (updatedUser) {
			res.status(200).json({
				message: `User ${updatedUser.username} updated.`,
			});
		}
	} catch (error) {
		res.status(400).json({ message: "Failed to edit user." });
	}
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
	const { id, password } = req.params;

	if (!id || !password) {
		res.status(400).json({ message: "User ID and password required." });
		return;
	}

	const user = await User.findById(id).exec();

	if (!user) {
		res.status(400).json({ message: "User not found." });
		return;
	}

	try {
		const match = await compare(password, user.password);

		if (!match) {
			res.status(401).json({ message: "Wrong password." });
			return;
		}

		const deletedUser = await User.findByIdAndDelete(id).select("username");

		if (!deletedUser) throw new Error();

		const cookies = req.cookies;

		if (!cookies?.jwt) {
			res.status(400).json({ message: "No cookie found." });
			return;
		}

		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		res.status(200).json({
			message: `User ${deletedUser.username} deleted.`,
		});
	} catch (error) {
		res.status(400).json({ message: "Failed to delete user." });
	}
});
