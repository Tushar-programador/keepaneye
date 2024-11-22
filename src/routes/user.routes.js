import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/me", UserController.getProfile);

router.get("/update", UserController.updateProfile);

router.delete("/delete", UserController.deleteAccount);

export default router;
