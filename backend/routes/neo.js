const express = require("express");
const axios = require("axios");
const router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;

router.get("/neo", async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${NASA_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("NEO fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch NEO data." });
  }
});

module.exports = router;
