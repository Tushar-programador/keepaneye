const express = require("express");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQyM2JiMjY3NTU4Nzg3Yzg3ZWQ4YTkiLCJpYXQiOjE3MzMwNzUzMzEsImV4cCI6MTczMzE2MTczMX0.6Xpi2qrC0I93pVN8rm0Y4xSacMypqC-TkXLa3AhRWNc";
app.use(express.json());
app.use(express.text());

// Temporary storage for monitoring tasks
let monitoredWebsites = [];

// Endpoint to receive monitoring tasks from the main server
app.post("/assign-task", (req, res) => {
  const websites = req.body;
  console.log("Received data:", websites);
  monitoredWebsites = websites;
  res.status(200).json({ message: "Websites assigned for monitoring" });
});

// Cron job to monitor websites every minute
cron.schedule("*/3 * * * *", async () => {
  console.log("Cron job started...");
  const results = await monitorWebsites(monitoredWebsites);
  console.log("results");
  console.log(results);
  // Send all results back to the server in parallel
  await sendResultsToServer(results);

  console.log("Cron job ended.");
});

// Function to monitor websites
const monitorWebsites = async (websites) => {
  console.log("Monitored Websites:", websites);

  if (!websites || websites.length === 0) {
    console.log("No websites to monitor");
    return [];
  }

  // Monitor all websites in parallel
  const promises = websites.map(async (site) => {
    if (!site.url || !site.url.startsWith("http")) {
      console.error("Invalid URL provided:", site.url);
      return { websiteId: site.id, isUp: false, responseTime: null };
    }

    try {
      const startTime = Date.now();
      await axios.get(site.url, {
        headers: { "User-Agent": "Monitoring-Bot/1.0" },
      });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(site.id);
      console.log(
        `Website ${site.url} is UP. Response time: ${responseTime} ms`
      );
      return { websiteId: site.id, isUp: true, responseTime };
    } catch (error) {
      console.error(`Error checking ${site.url}: ${error.message}`);
      return { websiteId: site.id, isUp: false, responseTime: null };
    }
  });

  // Wait for all promises to resolve
  return await Promise.all(promises);
};

// Function to send results back to the main server in parallel
const sendResultsToServer = async (results) => {
  console.log("Sending results back to the main server...");

  const promises = results.map(async (result) => {
    try {
      await axios.post(
        "http://localhost:8000/v1/api/monitor/update-status",
        result,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(
        `Result for website ID ${result.websiteId} sent successfully.`
      );
    } catch (error) {
      console.error(
        `Failed to send result for website ID ${result.websiteId}: ${error.message}`
      );
    }
  });

  // Wait for all promises to complete
  await Promise.all(promises);
};

// Start the geo server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Geo server running on port ${PORT}`);
});
