import express from "express";
import AuthController from "../controller/auth-controller";

const router = express.Router();

router.post("/login", AuthController.prototype.login);
router.post("/register", AuthController.prototype.register);
router.post("/verify", AuthController.prototype.verifyUser);
router.post("/logout", AuthController.prototype.logout);

export default router;