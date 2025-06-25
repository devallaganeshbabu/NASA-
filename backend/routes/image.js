const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const query = req.query.q || 'moon';
  try {
    const { data } = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;
