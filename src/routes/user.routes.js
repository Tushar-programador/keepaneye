import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";
import accessToken from "../middlewares/auth.js";
router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/me", accessToken, UserController.getProfile);

router.patch("/update/:id", UserController.updateProfile);

router.delete("/delete/:id", UserController.deleteAccount);

export default router;
