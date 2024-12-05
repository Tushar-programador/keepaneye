import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views"); // Ensure all EJS files are inside the 'views' folder
app.use(express.static("public"));


import router from "./routes/index.js";

app.use("/v1/api", router);
export { app };
