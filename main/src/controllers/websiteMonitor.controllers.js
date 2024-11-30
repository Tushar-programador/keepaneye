// import Websites from "../models/website.model";
import websites from "../models/website.model.js";
import axios from "axios";

export const assignTasksToGeoServers = async (req, res) => {
  try {
    // Fetch all websites and group them by region
    console.log(1);
    const AllWebsites = await websites.find();
    console.log(2);

    if (websites.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No websites found to assign tasks",
      });
    }
    
    const regions = {
      US: AllWebsites.filter((site) => site.region === "US"),
      Europe: AllWebsites.filter((site) => site.region === "Europe"),
      India: AllWebsites.filter((site) => site.region === "India"),
    };
    console.log(regions);
    // Send tasks to respective geo servers
    // await axios.post("http://US_SERVER_URL/assign-task", {
    //   websites: regions.US,
    // });
    // await axios.post("http://EUROPE_SERVER_URL/assign-task", {
    //   websites: regions.Europe,
    // });
    await axios.post("http://localhost:5001/assign-task", {
      websites: regions.India,
    });

    res.status(200).json({ message: "Tasks assigned to geo servers" });
  } catch (error) {
    console.error("Error assigning tasks to geo servers:", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
    console.log(req.body)
    const { websiteId, isUp } = req.body;
    if (!websiteId || typeof isUp!== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }
    // Check if website exists
   
    
    // Update website status in the database
    const website = await websites.findById(websiteId);
    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    if (website) {
      website.isUp = isUp;
      website.lastChecked = new Date();
      await website.save();
    }

    res.status(200).json({ message: "Website status updated" });
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({ error: error.message });
  }
};
