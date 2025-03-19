import express from "express";
import { getAllUrls, storeUrl } from "../controller/url.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/storeUrl", authenticateUser, storeUrl);
router.get("/:shortenedUrl", storeUrl);
router.get("/", getAllUrls);

export default router;
