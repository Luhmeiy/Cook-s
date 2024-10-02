import expressAsyncHandler from "express-async-handler";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const login = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are required.");
	}

	const foundUser = await User.findOne({ email }).exec();

	if (!foundUser) {
		res.status(401);
		throw new Error("User not found.");
	}

	const match = await compare(password, foundUser.password);

	if (!match) {
		res.status(401);
		throw new Error("Wrong password.");
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

	res.json({ accessToken });
});

export const refresh = (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.status(401);
		throw new Error("Unauthorized.");
	}

	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		async (err, decoded) => {
			if (err) {
				res.status(403);
				throw new Error("Forbidden.");
			}

			const foundUser = await User.findOne({
				username: decoded.username,
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

			res.json({ accessToken });
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
