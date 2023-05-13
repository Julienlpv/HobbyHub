const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiKey = 'AIzaSyA2e6nCsrhvdNPmoeZBIcygLLWfmbZYa1Q';

router.get('/:volumeId', async (req, res) => {
  try {
    const { volumeId } = req.params;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${volumeId}/reviews?key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
