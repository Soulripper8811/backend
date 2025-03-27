import express from "express";
import {
  deleteUrl,
  getAllUrls,
  storeUrl,
} from "../controller/url.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/storeUrl", authenticateUser, storeUrl);
router.get("/", getAllUrls);
router.delete("/:shortenedUrlId", authenticateUser, deleteUrl);

export default router;
