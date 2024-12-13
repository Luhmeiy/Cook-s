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
			res.status(401).json({ message: "User not found." });
			return;
		} else if (!foundUser.confirmed) {
			res.status(401).json({ message: "Confirm your email." });
			return;
		}

		if (password) {
			const match = await compare(password, foundUser.password);

			if (!match) {
				res.status(401).json({ message: "Wrong password." });
				return;
			}
		}

		try {
			const accessToken = jwt.sign(
				{ _id: foundUser._id },
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: "15m" }
			);

			const refreshToken = jwt.sign(
				{ _id: foundUser._id },
				process.env.REFRESH_TOKEN_SECRET!,
				{ expiresIn: "7d" }
			);

			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			res.status(200).json({ user: foundUser, accessToken });
		} catch (error) {
			res.status(400).json({ message: "Failed to log in." });
		}
	} else {
		res.status(400).json({ message: "All fields are required." });
	}
});

export const register = expressAsyncHandler(async (req, res) => {
	const { email, username, password, description, isPublic } = req.body;

	if (!email || !username || !password || !isPublic.toString()) {
		res.status(400).json({ message: "All fields are required." });
		return;
	}

	const lowerCaseEmail = email.toLowerCase();
	const foundUser = await User.findOne({ email: lowerCaseEmail });

	if (foundUser) {
		res.status(409).json({ message: "User already exists." });
		return;
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

	try {
		const user = await User.create(userObject);

		res.status(201).json({
			message: `New user ${user.username} created.`,
		});
	} catch (error) {
		res.status(400).json({ message: "Failed to register." });
	}
});

export const verifyEmail = expressAsyncHandler(async (req, res) => {
	const { email } = req.body;

	if (!email) {
		res.status(400).json({ message: "Email is required." });
		return;
	}

	const lowerCaseEmail = email.toLowerCase();
	const foundUser = await User.findOne({ email: lowerCaseEmail });

	if (foundUser) {
		res.status(409).json({ message: "Email is already in use." });
		return;
	}

	res.status(200).json({
		message: "User doesn't exist.",
	});
});

export const changePassword = expressAsyncHandler(async (req, res) => {
	const { userId, currentPassword, newPassword } = req.body;

	const foundUser = await User.findById(userId);

	if (!foundUser) {
		res.status(404).json({ message: "User not found." });
		return;
	}

	const isMatch = await bcrypt.compare(currentPassword, foundUser.password);

	if (!isMatch) {
		res.status(400).json({ message: "Wrong password." });
		return;
	}

	try {
		foundUser.password = await bcrypt.hash(newPassword, 10);
		await foundUser.save();

		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		res.status(200).json({ message: "Password successfully updated." });
	} catch (error) {
		res.status(400).json({ message: "Failed to change password." });
	}
});

export const forgotPassword = expressAsyncHandler(async (req, res) => {
	const { email } = req.body;

	if (!email) {
		res.status(400).json({ message: "Email is required." });
		return;
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found." });
		return;
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

		res.status(200).json({
			message: "Password reset link sent to your email.",
		});
	} catch (error) {
		res.status(500).json({ message: "Failed to send email." });
		return;
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
			res.status(400).json({ message: "Invalid token purpose." });
			return;
		}

		const user = await User.findById(decoded._id);

		if (!user) {
			res.status(404).json({ message: "User not found." });
			return;
		}

		user.password = await bcrypt.hash(password, 10);
		await user.save();

		res.status(200).json({ message: "Password successfully reset" });
	} catch (error) {
		if ((error as { name: string }).name === "TokenExpiredError") {
			res.status(400).json({ message: "Token expired." });
			return;
		}

		res.status(500).json({ message: "Failed to reset password." });
	}
});

export const refresh = (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.status(401).json({ message: "Unauthorized." });
		return;
	}

	const refreshToken = cookies.jwt as string;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		async (err, decoded) => {
			if (err) {
				res.status(403).json({ message: "Forbidden." });
				return;
			}

			const foundUser = await User.findById(
				(decoded as DecodedUser)._id
			).exec();

			if (!foundUser) {
				res.status(401).json({ message: "User not found." });
				return;
			}

			const accessToken = jwt.sign(
				{
					UserInfo: {
						_id: foundUser._id,
					},
				},
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: "15m" }
			);

			res.status(200).json({ user: foundUser, accessToken });
		}
	);
};

export const logout = (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.status(401).json({ message: "Unauthorized." });
		return;
	}

	res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
	res.status(200).json({ message: "Cookie cleared" });
};
