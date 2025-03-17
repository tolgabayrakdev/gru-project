import express from "express";

import authRoutes from "../src/routes/auth-routes";
import feedbackPageRoutes from "../src/routes/feedback-page-route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/feedback-pages", feedbackPageRoutes);

export default router;