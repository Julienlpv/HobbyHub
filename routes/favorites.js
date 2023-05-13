const express = require('express');
const router = express.Router();
const Favorite = require('./../models/favorites');

// Récupérer tous les favoris
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer un favori
router.post('/', async (req, res) => {
  const favorite = new Favorite({
    bookId: req.body.bookId,
    title: req.body.title,
  });

  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Accéder à un favori
router.get('/:id', getFavorite, (req, res) => {
  res.json(res.favorite);
});

// Mettre à jour un favori
router.patch('/:id', getFavorite, async (req, res) => {
  if (req.body.bookId) {
    res.favorite.bookId = req.body.bookId;
  }
  if (req.body.title) {
    res.favorite.title = req.body.title;
  }

  try {
    const updatedFavorite = await res.favorite.save();
    res.json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un favori
router.delete('/:id', getFavorite, async (req, res) => {
  try {
    await res.favorite.remove();
    res.json({ message: 'Favorite deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


async function getFavorite(req, res, next) {
  let favorite;
  try {
    favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.favorite = favorite;
  next();
}

module.exports = router;
