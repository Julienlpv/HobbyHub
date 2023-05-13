const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiKey = 'AIzaSyA2e6nCsrhvdNPmoeZBIcygLLWfmbZYa1Q';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${apiKey}`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
