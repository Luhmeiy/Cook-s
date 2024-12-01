import express from "express";
import { verifyJWT } from "@/middleware/verifyJWT";

export const router = express();

import { router as authRoutes } from "./authRoutes";
import { router as recipeRoutes } from "./recipeRoutes";
import { router as listRoutes } from "./listRoutes";
import { router as userRoutes } from "./userRoutes";

router.use("/auth", authRoutes);
router.use("/recipes", recipeRoutes);
router.use("/user", userRoutes);

router.use(verifyJWT);
router.use("/list", listRoutes);
