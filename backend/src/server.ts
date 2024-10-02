import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { connectDB } from "./config/db";
import { router } from "./routes/router";

// Config dotenv and connect to MongoDB
config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve cors
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);

app.use(cookieParser());

app.use(router);

// 404
app.all("*", (req, res) => {
	res.status(404);
	res.send("Path not found.");
});

// Mongoose connection
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
});

mongoose.connection.on("error", (err) => {
	console.log(err);
});
