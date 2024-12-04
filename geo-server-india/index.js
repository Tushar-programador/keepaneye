const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQyM2JiMjY3NTU4Nzg3Yzg3ZWQ4YTkiLCJpYXQiOjE3MzMyNTcxMjksImV4cCI6MTczMzM0MzUyOX0.o_pDjHyWaQappl1YXiw8RyVg_PHMomiJzSYIRskCNn8";
  app.use(express.json());
app.use(express.text());

let websites = []; // List of websites to monitor

// Endpoint to assign the list of websites to monitor
app.post("/assign-task", async (req, res) => {
  websites = req.body.websites; // Update the list of websites to monitor
  if (!websites || !Array.isArray(websites)) {
    return res.status(400).json({ message: "Invalid websites data" });
  }
  console.log("Received websites:", websites);
  res.status(200).json({ message: "Websites received for monitoring" });
});

// Function to check the status of a website
const checkWebsite = async (website) => {
  try {
    const start = Date.now();
    // Simulate an HTTP request (or actual HTTP call)
    await axios.get(website.url, { timeout: 5000 });
    const responseTime = Date.now() - start;
    return { ...website, status: "UP", responseTime };
  } catch {
    return { ...website, status: "DOWN", responseTime: -1 };
  }
};

// Cron job to monitor websites every 2 minutes
cron.schedule("* * * * *", async () => {
  if (!websites.length) {
    console.log("No websites to monitor.");
    return;
  }
  console.log("Starting website monitoring...");

  try {
    // Check all websites in parallel
    const results = await Promise.all(websites.map(checkWebsite));
    console.log("Monitoring Results:", results);

    // Send results to the main server
    await axios.post("http://localhost:8000/v1/api/monitor/update-status", {
      accessToken,
      data: results, // Send the updated website statuses
    },{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    console.log("Monitoring results sent to the main server.");
  } catch (error) {
    console.error("Error during monitoring:", error.message);
  }
});

// Start the Geo server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Geo server running on port ${PORT}`);
});
