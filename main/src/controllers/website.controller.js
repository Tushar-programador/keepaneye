import Websites from "../models/website.model.js";
// **Create a New Website**
export const createWebsite = async (req, res) => {
  try {
    const { name, url, owner, region } = req.body;
    const newWebsite = await Websites.create({ name, url, owner, region });
    await newWebsite.save();
    res.status(201).json({
      success: true,
      message: "Website created successfully",
      data: newWebsite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create website",
      error: error.message,
    });
  }
};

// **Get All Websites**
export const getAllWebsites = async (req, res) => {
  try {
    const websites = await Websites.find().populate("owner", "name email");
    res.status(200).json({ success: true, data: websites });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve websites",
      error: error.message,
    });
  }
};

// **Get Website by ID**
export const getWebsiteById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    const website = await Websites.findById(id).populate("owner", "name email");
    console.log(website)
    if (!website)
      return res
        .status(404)
        .json({ success: false, message: "Website not found" });

    res.status(200).json({ success: true, data: website });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve website",
      error: error.message,
    });
  }
};

// **Update a Website**
export const updateWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, owner, region, status } = req.body;

    const updatedWebsite = await Websites.findByIdAndUpdate(
      id,
      { name, url, owner, region, status, lastUpdated: Date.now() },
      { new: true }
    );

    if (!updatedWebsite)
      return res
        .status(404)
        .json({ success: false, message: "Website not found" });

    res.status(200).json({
      success: true,
      message: "Website updated successfully",
      data: updatedWebsite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update website",
      error: error.message,
    });
  }
};

// **Delete a Website**
export const deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWebsite = await Websites.findByIdAndDelete(id);

    if (!deletedWebsite)
      return res
        .status(404)
        .json({ success: false, message: "Website not found" });

    res.status(200).json({
      success: true,
      message: "Website deleted successfully",
      data: deletedWebsite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete website",
      error: error.message,
    });
  }
};
