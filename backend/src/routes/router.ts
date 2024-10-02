import express from "express";
export const router = express();

import { router as authRoutes } from "./authRoutes";
import { router as listRoutes } from "./listRoutes";
import { router as recipeRoutes } from "./recipeRoutes";
import { router as userRoutes } from "./userRoutes";

router.use("/auth", authRoutes);
router.use("/list", listRoutes);
router.use("/recipes", recipeRoutes);
router.use("/user", userRoutes);
