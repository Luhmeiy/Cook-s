import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";
import { Request, Response } from "express";

import User from "@/models/User";
import { DecodedUser } from "@/types/DecodedUser";

export const login = expressAsyncHandler(async (req, res) => {
	const { email, password, isGoogle } = req.body;

	if (email && (password || isGoogle)) {
		const lowerCaseEmail = email.toLowerCase();

		const foundUser = await User.findOne({ email: lowerCaseEmail }).exec();

		if (!foundUser) {
			res.status(401);
			throw new Error("User not found.");
		}

		if (password) {
			const match = await compare(password, foundUser.password);

			if (!match) {
				res.status(401);
				throw new Error("Wrong password.");
			}
		}

		const accessToken = jwt.sign(
			{ username: foundUser.username },
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET!,
			{ expiresIn: "7d" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.json({ user: foundUser, accessToken });
	} else {
		res.status(400);
		throw new Error("All fields are required.");
	}
});

export const register = expressAsyncHandler(async (req, res) => {
	const { email, username, password, description, isPublic } = req.body;

	if (!email || !username || !password || !isPublic.toString()) {
		res.status(400);
		throw new Error("All fields are required.");
	}

	const lowerCaseEmail = email.toLowerCase();

	const existingUser = await User.findOne({ email: lowerCaseEmail });

	if (existingUser) {
		res.status(409);
		throw new Error("User already exists.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const userObject = {
		email: lowerCaseEmail,
		username,
		password: hashedPassword,
		description,
		public: isPublic,
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

export const refresh = (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.status(401);
		throw new Error("Unauthorized.");
	}

	const refreshToken = cookies.jwt as string;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		async (err, decoded) => {
			if (err) {
				res.status(403);
				throw new Error("Forbidden.");
			}

			const foundUser = await User.findOne({
				username: (decoded as DecodedUser).username,
			}).exec();

			if (!foundUser) {
				res.status(401);
				throw new Error("Unauthorized.");
			}

			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: foundUser.username,
					},
				},
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: "15m" }
			);

			res.json({ user: foundUser, accessToken });
		}
	);
};

export const logout = (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.sendStatus(204);
	}

	res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

	res.json({ message: "Cookie cleared" });
};
