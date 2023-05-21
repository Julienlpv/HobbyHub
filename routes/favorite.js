const express = require('express');
const router = express.Router();
const  requireAuth  = require('./auth');
const axios = require('axios');
const Favorite = require('./../models/favoritesModel');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const User = require('./../models/userModel');
const bcrypt = require('bcrypt');
const Book = require('./../models/bookModel')
const jwt = require('jsonwebtoken');


// router.post('/addToFavorites/:bookId', requireAuth, async (req, res) => {
//   if (!req.user) {
//     res.status(401).json({ message: 'User not authenticated' });
//   } else {
//     try {
//       const bookId = req.params.bookId;
//       // Ici, je suppose que vous avez stocké l'ID de l'utilisateur dans le JWT
//       const userId = req.user.userId;
        
//       // Recherche de l'utilisateur dans la base de données
//       const user = await User.findById(userId);

//       // Vérifiez si l'utilisateur existe
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Créer un nouvel objet de favoris
//       const favorite = new Favorite({
//         bookId: bookId,
//         userId: userId
//       });

//       // Sauvegarder le nouveau favori dans la base de données
//       await favorite.save();

//       // Ajouter l'ID du favori à l'utilisateur
//       user.favorites.push(favorite._id);

//       // Sauvegarder l'utilisateur
//       await user.save();

//       res.status(201).json({ message: 'Book added to favorites' });
//     } catch (error) {
//       console.error('Error adding book to favorites:', error);
//       res.status(500).json({ message: 'Error adding book to favorites' });
//     }
//   }
// });


///////////////////////// INSERTION DES DONNEES DE LAPI DANS LA BASE MONGODB ///////////////////////////
  
  // Requête à l'API Google Books
  // function searchAndSaveBooks(searchTerm) {
  //   const axios = require('axios');
  //   axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
  //     .then(response => {
  //       // Parcourir chaque livre retourné par l'API
  //       for (let item of response.data.items) {
  //         // Créer un nouvel objet Book avec les données de l'API
  //         let book = new Book({
  //           name: item.volumeInfo.title,
  //           Author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "N/A",
  //           PageNumber: item.volumeInfo.pageCount,
  //           Style: item.volumeInfo.categories ? item.volumeInfo.categories.join(", ") : "N/A",
  //           Editor: item.volumeInfo.publisher ? item.volumeInfo.publisher : "N/A"
  //         });

  //         // Sauvegarder le nouveau livre dans la base de données
  //         book.save()
  //           .then(() => console.log(`Le livre ${book.name} a été sauvegardé !`))
  //           .catch(error => console.log('Erreur lors de la sauvegarde du livre :', error));
  //       }
  //     })
  //     .catch(error => console.log('Erreur lors de la récupération des données de l\'API Google Books:', error));

  // }



router.post('/addToFavorites/:bookId', requireAuth, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'User not authenticated' });
  } else {
    try {
      const bookId = req.params.bookId;
      const userId = req.user.userId;

      // Vérifiez si le livre existe dans la base de données
      let book = await Book.findById(bookId);

      // Si le livre n'existe pas dans la base de données, récupérez les données depuis l'API Google Books et sauvegardez-le
      if (!book) {
        const axios = require('axios');
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const bookData = response.data;
        book = new Book({
          name: bookData.volumeInfo.title,
          Author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(", ") : "N/A",
          PageNumber: bookData.volumeInfo.pageCount,
          Style: bookData.volumeInfo.categories ? bookData.volumeInfo.categories.join(", ") : "N/A",
          Editor: bookData.volumeInfo.publisher ? bookData.volumeInfo.publisher : "N/A"
        });
        const favorite = new Favorite({
              userId: userId,
              bookId: bookId,
              title: book.name, 
        });

        

        await book.save();
        await favorite.save();
      }

      // Recherche de l'utilisateur dans la base de données
      const user = await User.findById(userId);

      // Vérifiez si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Vérifiez si le livre est déjà dans les favoris de l'utilisateur
      if (user.favorites.includes(bookId)) {
        return res.status(400).json({ message: 'Book already in favorites' });
      }

      // Ajouter l'ID du livre aux favoris de l'utilisateur
      user.favorites.push(bookId);
      


      // Sauvegarder l'utilisateur avec le livre ajouté aux favoris
      await user.save();

      res.status(201).json({ message: 'Book added to favorites' });
    } catch (error) {
      console.error('Error adding book to favorites:', error);
      res.status(500).json({ message: 'Error adding book to favorites' });
    }
  }
});

/////////////////// RECUPERATION DES FAVORIS DE L'UTILISATEUR CONNECTE ///////////////////////

router.get('/', requireAuth, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Récupérer le token depuis l'en-tête de la requête
  const secret = process.env.MY_SECRET_KEY;

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    console.log(userId);

    // Effectuer les opérations nécessaires pour récupérer les favoris de l'utilisateur avec l'ID `userId`
    const userFavorites = await Favorite.find({ userId: userId }); // Requête pour récupérer les favoris de l'utilisateur correspondant à l'ID `userId`
    console.log(userFavorites);
    // Envoyer la réponse avec les favoris de l'utilisateur
    res.json(userFavorites);
    
  } catch (error) {
    // Gérer les erreurs de décodage du token
    console.error('Erreur lors du décodage du token :', error);
    res.status(401).json({ error: 'Token invalide' });
  }
});

// // Récupérer tous les favoris d'un utilisateur connecté
// router.get('/', requireAuth, async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     // Recherche de tous les favoris de l'utilisateur
//     const favorites = await Favorite.find({ userId });

//     res.json(favorites);
//   } catch (error) {
//     console.error('Error fetching favorites:', error);
//     res.status(500).json({ message: 'Error fetching favorites' });
//   }
// });



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
