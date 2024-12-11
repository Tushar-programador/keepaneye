
import { sendEmail } from "../utils/emailServices.js";
import websites from "../models/website.model.js";
import axios from "axios";

export const assignTasksToGeoServers = async (req, res) => {
  try {
    // Fetch all websites and group them by region

    const AllWebsites = await websites.find();

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

 //! Still Under Devlopmet
 
    // Send tasks to respective geo servers
    // await axios.post("http://US_SERVER_URL/assign-task", {
    //   websites: regions.US,
    // });
    // await axios.post("http://EUROPE_SERVER_URL/assign-task", {
    //   websites: regions.Europe,
    // });
    console.log("Assign tasks");
    await axios.post(
      "http://localhost:5001/assign-task",

      {
        websites: regions.India,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Tasks assigned to geo servers" });
  } catch (error) {
    console.error("Error assigning tasks to geo servers:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Email setup (configure this according to your email provider)


export const updateStatus = async (req, res) => {
  try {
    console.log("Updating status");

    const { data } = req.body;

    // Validate that `data` is an array
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body. Ensure `data` is a non-empty array.",
      });
    }

    const results = await Promise.all(
      data.map(async (item) => {
        const { id, status } = item;

        // Validate individual entries
        if (!id || typeof status !== "boolean") {
          return { id, success: false, message: "Invalid item in data array." };
        }

        // Find the website in the database
        const website = await websites.findById(id).populate("owner", "email");
        if (!website) {
          return { id, success: false, message: "Website not found." };
        }

        // Update website status and notify owner if the site is down
        website.isUp = status;
        website.lastChecked = new Date();

        if (!status) {
          // Send email to the website owner
          const ownerEmail = website.owner?.email;
          if (ownerEmail) {
            await sendEmail(ownerEmail, website.name, website.url);
          }
        }

        await website.save();

        return { id, success: true, message: "Website status updated." };
      })
    );

    res.status(200).json({
      success: true,
      message: "Statuses updated.",
      results,
    });
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

