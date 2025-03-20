import express from "express";
import cors from "cors";
import userRoutes from "../backend/routes/user.routes.js";
import urlRoutes from "../backend/routes/url.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/url", urlRoutes);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
