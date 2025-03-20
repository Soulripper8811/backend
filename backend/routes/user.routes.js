import express from "express";
import { getMe, Login, logut, Signup } from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/me", authenticateUser, getMe);
router.post("/logout", authenticateUser, logut);

export default router;
