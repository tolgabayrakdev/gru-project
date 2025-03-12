import express from "express";

import authRoutes from "../src/routes/auth-routes";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;