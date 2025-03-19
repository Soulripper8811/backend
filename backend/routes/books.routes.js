import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controller/books.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/createBook", authenticateUser, createBook);
router.get("/:bookId", authenticateUser, getSingleBook);
router.get("/", authenticateUser, getAllBooks);
router.patch("/:bookId", authenticateUser, updateBook);
router.delete("/:bookId", authenticateUser, deleteBook);

export default router;
