const express = require('express');
const router = express.Router();
const { requireAuth } = require('./auth');
const axios = require('axios');
const Favorite  = require('./../app');

///////////////////////////////// AJOUTER UN FAVORI ///////////////////////////////////////////////

// router.post('/', async (req, res) => {
//   const favorite = new Favorite({
//     userId: req.body.userId,
//     bookId: req.body.bookId,
//     title: req.body.title,
//   });

//   try {
//     const newFavorite = await favorite.save();
//     res.status(201).json(newFavorite);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


router.post('/addToFavorites/:bookId',   async (req, res) => {  // Ajouter RequireAuth 
    
    if(!req.user) {
        return res.status(401).send('Vous devez être connecté pour ajouter des favoris.');
    }

  const bookId = req.params.bookId;
  
  let bookDetails = null;
  
  try {
        
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    bookDetails = response.data;
    
    
    console.log(bookDetails); //ok fonctionne
    } catch(error) {
        console.error('Erreur lors de la récupération des détails du livre:', error);
        return res.status(500).send('Erreur lors de la récupération des détails du livre.');
    }

    // creation du nouveau favori [ERREUR ICI !]
    const newFavorite = new Favorite({
        userId: req.user._id,
        bookId: bookId,
        title: bookDetails.volumeInfo.title
    });

    // sauvegarde du nouveau favori
    try {
        await newFavorite.save();
        res.send('Le livre a été ajouté à vos favoris.');
    } catch(error) {
        console.error('Erreur', error);
        res.status(500).send('Erreur.');
    }
});

///////////////////////////////////////////// TOUS LES FAVORIS D'UN USER ////////////////////////////////////////////////////////////


router.get('/user/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Accéder à un favori
router.get('/:id', getFavorite, (req, res) => {
  res.json(res.favorite);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Mettre à jour un favori
router.patch('/:id', getFavorite, async (req, res) => {
  if (req.body.userId) {
    res.favorite.userId = req.body.userId;
  }
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
  // Vérifier que l'utilisateur est le propriétaire du favori
  if (req.user.id !== res.favorite.userId) {
    return res.status(403).json({ message: 'pas votre favori' });
  }
  try {
    await res.favorite.remove();
    res.json({ message: 'Favori supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




async function getFavorite(req, res, next) {
  let favorite;
  try {
    favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite introuvable' });
    }

    // Vérifier que l'utilisateur est le propriétaire du favori
    if (req.user.id !== favorite.userId) {
      return res.status(403).json({ message: 'Pas votre fav' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.favorite = favorite;
  next();
}





module.exports = router;
