const express = require("express");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.text())

// Temporary storage for monitoring tasks
let monitoredWebsites = [];

// Endpoint to receive monitoring tasks from the main server
app.post("/assign-task", (req, res) => {
  console.log(req);
  const  websites  = req.body; // List of websites to monitor

  monitoredWebsites = websites;
  console.log("Websites assigned for monitoring:", monitoredWebsites);
  res.status(200).json({ message: "Websites assigned for monitoring" });
});

cron.schedule("*/1 * * * *", async () => {
  await monitoring();
  console.log("Checking websites...");
});

const monitoring = async () => {
  for (const site of monitoredWebsites) {
    try {
      if (!site.url || !site.url.startsWith("http")) {
        console.error("Invalid URL provided:", url);
        process.exit(1);
      }
      const response = await axios.get(site.url);
      console.log(`Status code for ${site.url}: ${response.status}`);
      const isUp = response.status >= 200 && response.status < 400;
     
      // Send status back to the main server
      // await axios.post("http://MAIN_SERVER_URL/update-status", {
      //   websiteId: site.id,
      //   isUp,
      // });
    } catch (error) {
      console.error(`Error checking ${site.url}:`, error.message);
      
      // Notify main server about downtime
      await axios.post("http://MAIN_SERVER_URL/update-status", {
        websiteId: site.id,
        isUp: false,
      });
    }
  }
};
// Start the geo server
const PORT = process.env.PORT || 5001;
app.listen(PORT, (req, res) => {
  console.log(`Geo server running on port ${PORT}`);
});
