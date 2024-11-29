import express from "express";
import {
  createWebsite,
  getAllWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
} from "../controllers/website.controller.js";

const router = express.Router();
router.post("/", createWebsite);
router.get("/", getAllWebsites);
router.get("/:id", getWebsiteById);
router.put("/:id", updateWebsite);
router.delete("/:id", deleteWebsite);

export default router;
