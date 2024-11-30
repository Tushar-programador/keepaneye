import express from "express";
import {
  createWebsite,
  getAllWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
} from "../controllers/website.controller.js";
import accessToken from "../middlewares/auth.js";

const router = express.Router();
router.post("/", accessToken, createWebsite);
router.get("/", accessToken, getAllWebsites);
router.get("/:id", accessToken, getWebsiteById);
router.put("/:id", accessToken, updateWebsite);
router.delete("/:id", accessToken, deleteWebsite);

export default router;
