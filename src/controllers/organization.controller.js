import Organization from "../models/organization.model.js"; // Import Organization schema

/**
 * Create a new organization
 * @route POST /api/organizations
 */
export const createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    // Create organization
    const newOrganization = new Organization({
      name,
      description,
    });

    await newOrganization.save();

    res.status(201).json({
      message: "Organization created successfully",
      organization: newOrganization,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all organizations
 * @route GET /api/organizations
 */
export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();

    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get a single organization by ID
 * @route GET /api/organizations/:id
 */
export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update an organization
 * @route PUT /api/organizations/:id
 */
export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    // Find and update organization
    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({
      message: "Organization updated successfully",
      organization: updatedOrganization,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete an organization
 * @route DELETE /api/organizations/:id
 */
export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete organization
    const deletedOrganization = await Organization.findByIdAndDelete(id);

    if (!deletedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
