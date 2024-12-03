const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQyM2JiMjY3NTU4Nzg3Yzg3ZWQ4YTkiLCJpYXQiOjE3MzMwNzUzMzEsImV4cCI6MTczMzE2MTczMX0.6Xpi2qrC0I93pVN8rm0Y4xSacMypqC-TkXLa3AhRWNc";
app.use(express.json());
app.use(express.text());


app.post("/assign-task", async (req, res) => {
  const websites = req.body.websites;
  console.log("Received websites:", websites);

  const checkWebsite = async (website) => {
    try {
      if (!websites || !Array.isArray(websites)) {
        return res.status(400).json({ message: "Invalid websites data" });
      }
      const start = Date.now();
      // Simulating an HTTP request (or actual HTTP call)
      await axios.get(website.url, { timeout: 5000 });
      const responseTime = Date.now() - start;
      return { ...website, status: "UP", responseTime };
    } catch {

      return { ...website, status: "DOWN", responseTime: -1 };
    }
  };

  try {
    const results = await Promise.all(websites.map(checkWebsite));
    console.log("Monitoring Results:", results);
    res.status(200).json({ message: "Monitoring completed", results });
  } catch (error) {
    console.error("Error in cron job:", error);
    res.status(500).json({ message: "Monitoring failed", error });
  }
});

// Start the geo server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Geo server running on port ${PORT}`);
});
