import express from "express";
import cors from "cors";
import userRoutes from "../backend/routes/user.routes.js";
import urlRoutes from "../backend/routes/url.routes.js";
import booksRoutes from "../backend/routes/books.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/books", booksRoutes);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
