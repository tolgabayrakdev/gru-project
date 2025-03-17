import express from "express";
import { FeedbackPageController } from "../controller/feedback-page-controller";

const router = express.Router();
const feedbackPageController = new FeedbackPageController();

router.post("/", feedbackPageController.create);
router.get("/:id", feedbackPageController.getById);
router.get("/token/:token", feedbackPageController.getByToken);
router.put("/:id", feedbackPageController.update);
router.delete("/:id", feedbackPageController.delete);
router.get("/token/:token/expired", feedbackPageController.isTokenExpired);

export default router;