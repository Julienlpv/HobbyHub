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
const favoritesRouter = require('./routes/favorites');
// const client = new MongoClient(process.env.MONGODB_URL);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const booksRouter = require('./routes/books.js');
const reviewsRouter = require('./routes/reviews');
const shelvesRouter = require('./routes/shelves');
const secret = process.env.MY_SECRET_KEY;
console.log(secret)
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


app.use(session({ secret: 'cats ' }));
app.use(passport.initialize());
app.use(passport.session());

// CORS middleware pour autoriser les requêtes cross-origin
app.use(cors());
require('dotenv').config();

app.use(express.json());  

async function main() {
    await mongoose.connect( 
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
    )
}




// Schéma de données pour les livres 
const bookSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    Author: {type: Schema.Types.String, required: true},
    PageNumber: {type: Schema.Types.Number, required:true},
    Style: {type: Schema.Types.String, required: true},
    Editor: {type: Schema.Types.String, required: true}
}) 

// Schéma de données pour les films 
const filmsSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    Author: {type: Schema.Types.String, required: true},
    PageNumber: {type: Schema.Types.Number, required: true},
    Style: {type: Schema.Types.String, required: true},
    Editor: {type: Schema.Types.String, required: true}
}) 

// Schéma de données pour les musiques
const musicSchema = new Schema({
    songname: {type: Schema.Types.String, required: true},
    Author: {type: Schema.Types.String, required: true},
    Artist: {type: Schema.Types.String, required: true},
    songDuration: {type: Schema.Types.Number, required: true},
    Style: {type: Schema.Types.String, required: true},
    Year: {type: Schema.Types.String, required: true}
}) 

// Schéma de données pour les utilisateurs
const userSchema = new Schema({
    // firstname: {type: Schema.Types.String, required: true},
    // lastname: {type: Schema.Types.String, required: true},
    // email: {type: Schema.Types.String, required: true},
    // registerDate: {type: Schema.Types.Date, required: true},
    // birthDate: {type: Schema.Types.Date, required: true},
    // Year: {type: Schema.Types.Number, required: true}
    username: { type: Schema.Types.String, required: true },
    password: {type: Schema.Types.String, required: true }

}) 

const favoriteSchema = new Schema({
  bookId: { type: String, required: true },
  title: {type: String, required: true}
})



const musicModel = mongoose.model('musicModel', musicSchema);
const bookModel = mongoose.model('bookModel', bookSchema);
const filmModel = mongoose.model('filmModel',filmsSchema);
const User = mongoose.model('userModel', userSchema);
const favoriteModel = mongoose.model('Favorite', favoriteSchema);

module.exports = favoriteModel;
module.exports = bookModel;
module.exports = filmModel;
module.exports = musicModel;
module.exports = userSchema;
module.exports = User;
module.exports = favoriteModel;


//////////////////////// MIDDLEWARE DE HACHAGE /////////////////////////////////


userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});




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
    
/////////////// TEST POUR LES USERS //////////////////////////////
    
    
    app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
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
app.use('/api/books', requireAuth, booksRouter);
// Route Favs 
app.use('/api/favorites', requireAuth, favoritesRouter);
// Route reviews
app.use('/api/reviews', requireAuth, reviewsRouter);
// Route shelves
app.use('/api/shelves', requireAuth, shelvesRouter);

  
///////////////////////////////////////////////////////////////////////////////////////////////////


  // Insérer le livre dans la collection de livres
  await newBook.save();

  // Récupérer le premier livre dans la collection de livres
  const firstBook = await bookModel.findOne();

  // Afficher les détails du livre
  console.log(firstBook);
};




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