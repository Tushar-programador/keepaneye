import axios from "axios";
import { Website } from "./models/website.model.js";

export const assignTasksToGeoServers = async (req, res) => {
  try {
    // Fetch all websites and group them by region
    const websites = await Website.find();
    const regions = {
      US: websites.filter((site) => site.region === "US"),
      Europe: websites.filter((site) => site.region === "Europe"),
      India: websites.filter((site) => site.region === "India"),
    };

    // Send tasks to respective geo servers
    await axios.post("http://US_SERVER_URL/assign-task", {
      websites: regions.US,
    });
    await axios.post("http://EUROPE_SERVER_URL/assign-task", {
      websites: regions.Europe,
    });
    await axios.post("http://INDIA_SERVER_URL/assign-task", {
      websites: regions.India,
    });

    res.status(200).json({ message: "Tasks assigned to geo servers" });
  } catch (error) {
    console.error("Error assigning tasks to geo servers:", error.message);
    res.status(500).json({ error: error.message });
  }
};
