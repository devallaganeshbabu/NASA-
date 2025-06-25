const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

module.exports = router;
