// CRUD CREATE READ UPDATE DELETE

require('./googleAuth');
const username = "jujuodusseus";
const password = "95200-Sar";
const cluster = "hobbyhubcluster.xawna3v";
const dbname = "Hobbyhubdb";
const bcrypt = require('bcrypt'); 
const port = 3000; 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
// const client = new MongoClient(process.env.MONGODB_URL);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const booksRouter = require('./routes/books.js');
const reviewsRouter = require('./routes/reviews');
const favoritesRouter = require('./routes/favorite');
const secret = process.env.MY_SECRET_KEY;
console.log(secret)
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');

app.use(session({ secret: 'cats ' }));
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////////////////////////

const bookModel = require('./models/bookModel');
// const userModel = require('./models/userModel');
const Favorites = require('./models/favoritesModel');
const musicModel = require('./models/musicModel');
const filmModel = require('./models/filmModel');
const User = require('./models/userModel');

// CORS middleware pour autoriser les requêtes cross-origin
app.use(cors());
require('dotenv').config();

app.use(express.json());  
const options = {
  swaggerDefinition: {
    info: {
      title: "HobbyHub",
      servers: ["http://localhost:3000"], // Pour y accéder http://localhost:3000/swagger
    },
  },
  apis: ["app.js"],
};
 
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
 
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

async function main() {
    await mongoose.connect( 
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
    )
}


//////////////////// TEST D'INSERTION ////////////////////////////////

async function testInsertBook() {
  // Créer un nouveau livre
  const newBook = new bookModel({
    name: 'Le Petit Prince',
    Author: 'Antoine de Saint-Exupéry',
    PageNumber: 96,
    Style: 'Conte philosophique',
    Editor: 'Gallimard'
  });
    

///////////////////////// INSERTION DES DONNEES DE LAPI DANS LA BASE MONGODB ///////////////////////////


  function saveBookToDatabase(bookData) {
  let book = new bookModel({
    name: bookData.volumeInfo.title,
    Author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(", ") : "N/A",
    PageNumber: bookData.volumeInfo.pageCount,
    Style: bookData.volumeInfo.categories ? bookData.volumeInfo.categories.join(", ") : "N/A",
    Editor: bookData.volumeInfo.publisher ? bookData.volumeInfo.publisher : "N/A"
  });

  // Sauvegarder le nouveau livre dans la base de données
  book.save()
    .then(() => console.log(`Le livre ${book.name} a été sauvegardé !`))
    .catch(error => console.log('Erreur lors de la sauvegarde du livre :', error));
}

//sauvegarder le livre sélectionné dans la base de données
function addToFavorites(bookId) {
  const axios = require('axios');
  axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then(response => {
      const bookData = response.data;
      saveBookToDatabase(bookData);
    })
    .catch(error => console.log('Erreur lors de la récupération des données du livre depuis l\'API Google Books:', error));
}

/////////////// TEST POUR LES USERS //////////////////////////////
    
    
    app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
    });
  
/////////////// TEST POUR LES FAVORIS ///////////////////////////////
  
      app.get('/favs', async (req, res) => {
  const favorites = await Favorites.find({});
  res.send(favorites);
});

    
//////////// INSCRIPTION //////////////////////////////////////////
    
  app.post('/signup', async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  const secret = process.env.MY_SECRET_KEY;
  // Vérifier que username et password sont définis et non vides
  if (!username || !password) {
    return res.status(400).send('Le nom d\'utilisateur et le mot de passe sont requis');
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Cet utilisateur existe déjà');
    }

    // Créer un nouvel utilisateur
    user = new User({ username, password });

    // Hasher le mot de passe avant de sauvegarder l'utilisateur
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    // Vérifier que le secret est défini
    if (!secret) {
      throw new Error('Le secret pour signer le token JWT n\'est pas défini');
    }

    // Créer un token pour le nouvel utilisateur
    const token = jwt.sign({ userId: user._id }, secret);

    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue lors de l\'inscription');
  }
});


    
    
///////////// AUTHENTIFICATION //////////////////////////////////
  
  app.post('/signin', async (req, res) => {
  const secret = process.env.MY_SECRET_KEY;
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(422).send({ error: 'Mot de passe ou identifiant invalide' });
  }
  
  const match = await bcrypt.compare(password, user.password);

  console.log('Resultat de la comparaison de bcrypt:', match);
  console.log('Mot de passe haché dans la base de données:', user.password);

  if (!match) {
    return res.status(422).send({ error: 'Mot de passe ou identifiant invalide' });
  }

  const token = jwt.sign({ userId: user._id, username: user.username }, secret);
  res.send({ token });
});


////////////// MIDDLEWARE DAUTHENTIFICATION /////////////////////////////////
  
  const requireAuth = (req, res, next) => {
  const secret = process.env.MY_SECRET_KEY;
  const {authorization} = req.headers;
  console.log("Authorization Header:", authorization);
  if (!authorization) {
    console.log("No Authorization Header"); 
    return res.status(401).send({error: 'Vous devez être connecté'});
  }
  const token = authorization.replace('Bearer ', '');
  console.log("Token:", token);
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      console.log("JWT Verification Error:", err); 
      return res.status(401).send({error: 'Vous devez être connecté'});
    }
    console.log("JWT Verification Success, Payload:", payload); 
    req.user = payload;
    next();
  });
};

 
  



  ////////////////////// ISLOGGED IN ////////////////////////////////

  function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  
  
  //////////////////////// AUTH AVEC GOOGLE /////////////////////////////////////

  app.get('/', (req, res) => {
        res.send('<a href="/auth/google"> Authentification avec Google</a>')
})

  app.get('/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile']})
  )
  
  app.get('/google/callback',
    passport.authenticate('google', {
      successRedirect: '/secret',
      failureRedirect: '/auth/failure',
    })
  );

  app.get('/auth/failure', (req, res) => {
    res.send('Quelque chose s\'est mal passé')
  })
  
  
  ///////////////////////////// ROUTE PROTEGEES DONT LA CONNEXION EST OBLIGATOIRE /////////////////////////////
  
  app.get('/secret', isLoggedIn || requireAuth, (req, res) => {
    res.send('You have accessed the secret route.');
  });
  
  
  app.get('/protected-route', requireAuth, (req, res) => {
  res.send({ message: `Hello, ${req.user.username}` });
});

  
  // Route books
app.use('/api/books', booksRouter);
// Route Favs 
app.use('/api/favorites', favoritesRouter);
// Route reviews
app.use('/api/reviews', reviewsRouter);



///////////////////////////////////////////////////////////////////////////////////////////////////


  // Insérer le livre dans la collection de livres
  await newBook.save();

  // Récupérer le premier livre dans la collection de livres
  const firstBook = await bookModel.findOne();

  // Afficher les détails du livre
  console.log(firstBook);
};

///////////////////////////////////////




main()
    .then(() => {
        console.log("test");
        testInsertBook()
    })
    .catch(console.error);



///////////////////////////////////////////


app.listen(port, () => {
  console.log(`Listening to the port ${port}`)
})




