const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiKey = 'AIzaSyA2e6nCsrhvdNPmoeZBIcygLLWfmbZYa1Q';



router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const page = req.query.page || 1; // Par défaut à la première page si non spécifié
    const maxResults = 12;
    const startIndex = (page - 1) * maxResults; // Calcule l'index de début pour la pagination
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`);
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error);
    res.status(500).json({ message: 'Error fetching data from Google Books API' });
  }
});

module.exports = router;
