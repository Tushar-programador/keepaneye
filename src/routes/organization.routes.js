import express from "express";
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organization.controller.js";

const router = express.Router();

// Organization Routes
router.post("/", createOrganization); // Create a new organization
router.get("/", getAllOrganizations); // Get all organizations
router.get("/:id",  getOrganizationById); // Get a single organization by ID
router.put("/:id",  updateOrganization); // Update an organization by ID
router.delete("/:id",  deleteOrganization); // Delete an organization by ID

export default router;
