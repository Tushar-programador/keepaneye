const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const responseTime = require("response-time");

// Enable response time logging

const app = express();
app.use(responseTime());
app.use(express.json());
app.use(express.text());

// Temporary storage for monitoring tasks
let monitoredWebsites = [];

// Endpoint to receive monitoring tasks from the main server
app.post("/assign-task", (req, res) => {
 
  const websites = req.body; // List of websites to monitor
  monitoredWebsites = websites;
  console.log("Websites assigned for monitoring:");
  res.status(200).json({ message: "Websites assigned for monitoring" });
});

cron.schedule("*/3 * * * *", async () => {
  console.log("Checking websites... started");
  await monitoring();
  console.log("Checking websites... Ended");
});

const monitoring = async () => {
  for (const site of monitoredWebsites) {
    try {
      console.log(1);
      if (!site.url || !site.url.startsWith("http")) {
        console.error("Invalid URL provided:", url);
        continue;
      }
      console.log(2);
      
      const startTime = Date.now();
      const response = await axios.get(site.url, {
        timeout: 5000, // 5 seconds timeout
        headers: {
          "User-Agent": "Monitoring-Bot/1.0",
        },
      });
      console.log(3);

      const endTime = Date.now();
      const responseTimeMs = endTime - startTime;
      console.log(4)
      console.log(
        `Status code for ${site.url}: ${response.status} : ${responseTimeMs}`
      );
      const isUp = response.status >= 200 && response.status < 400;

      // Send status back to the main server
      await axios.post("http://localhost:8000/v1/api/monitor/update-status", {
        websiteId: site.id,
        isUp,
        responseTime: responseTimeMs,
      });
    } catch (error) {
      console.error(`Error checking ${site.url}:`, error.message);

      // Notify main server about downtime
      await axios.post("http://MAIN_SERVER_URL/update-status", {
        websiteId: site.id,
        isUp: false,
        responseTime: responseTimeMs,
      });
    }
  }
};
// Start the geo server
const PORT = process.env.PORT || 5001;
app.listen(PORT, (req, res) => {
  console.log(`Geo server running on port ${PORT}`);
});
