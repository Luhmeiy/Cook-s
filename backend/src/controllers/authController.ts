import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt, { compare } from "bcrypt";
import { Request, Response } from "express";

import User from "@/models/User";
import { DecodedUser } from "@/types/DecodedUser";

type DecodedPasswordJwt = {
	_id: string;
	purpose: string;
};

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

export const forgotPassword = expressAsyncHandler(async (req, res) => {
	const { email } = req.body;

	if (!email) {
		res.status(400);
		throw new Error("Email is required.");
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error("User not found.");
	}

	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		jwt.sign(
			{ _id: user._id, purpose: "password-reset" },
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: "1h" },
			(err, resetToken) => {
				const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;

				transporter.sendMail({
					from: process.env.EMAIL,
					to: email,
					subject: "Password Reset",
					text: `Click the link to reset your password: ${resetLink}`,
				});
			}
		);

		res.json({ message: "Password reset link sent" });
	} catch (error) {
		res.status(500);
		throw new Error("Server error");
	}
});

export const resetPassword = expressAsyncHandler(async (req, res) => {
	const { token, password } = req.body;

	try {
		const decoded = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET!
		) as DecodedPasswordJwt;

		if (decoded.purpose !== "password-reset") {
			res.status(400);
			throw new Error("Invalid token purpose");
		}

		const user = await User.findById(decoded._id);

		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		user.password = await bcrypt.hash(password, 10);
		await user.save();

		res.json({ message: "Password successfully reset" });
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			res.status(400);
			throw new Error("Token expired");
		}

		res.status(500);
		throw new Error("Server error");
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
