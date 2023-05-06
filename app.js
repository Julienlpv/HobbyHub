// CRUD CREATE READ UPDATE DELETE  

const username = "jujuodusseus";
const password = "95200-Sar";
const cluster = "hobbyhubcluster.xawna3v";
const dbname = "Hobbyhubdb";
const bcrypt = require('bcrypt'); 
const port = 3000; 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();




const express = require('express');
const app = express();
app.use(express.json());  

async function main() {
    await mongoose.connect( 
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
    )
}


// const client = new MongoClient(process.env.MONGODB_URL);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const musicModel = mongoose.model('musicModel', musicSchema);
const bookModel = mongoose.model('bookModel', bookSchema);
const filmModel = mongoose.model('filmModel',filmsSchema);
const User = mongoose.model('userModel', userSchema);

module.exports = bookModel;
module.exports = filmModel;
module.exports = musicModel;
module.exports = userSchema;
module.exports = User;



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
  const { username, password } = req.body;

  // Vérifie si l'utilisateur existe déjà
  let user = await User.findOne({ username });
  if (user) {
    return res.status(400).send('Cet utilisateur existe déjà');
  }

  // Créer un nouvel utilisateur
  user = new User({ username, password });

  // Hasher le mot de passe avant de sauvegarder l'utilisateur
  user.password = await bcrypt.hash(user.password, 10);

  await user.save();

  // Créer un token pour le nouvel utilisateur
  const token = jwt.sign({ userId: user._id }, secret);

  res.status(201).send({ token });
});

    
    
///////////// AUTHENTIFICATION //////////////////////////////////
    var secret = process.env.MY_SECRET_KEY
    console.log(secret)

app.post('/signin', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if (!user) {
    return res.status(422).send({error: 'Mot de passe ou identifiant invalide'});
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({userId: user._id}, secret);
      res.send({token});
    } else {
      return res.status(422).send({error: 'Mot de passe ou identifiant invalide'});
    }
  } catch {
    return res.status(422).send({error: 'Mot de passe ou identifiant invalide'});
  }
});

const requireAuth = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return res.status(401).send({error: 'Vous devez être connecté'});
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(401).send({error: 'Vous devez être connecté'});
    }
    req.user = payload;
    next();
  });
};

app.get('/secret', requireAuth, (req, res) => {
  res.send('You have accessed the secret route.');
});



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



//////////////////////////


app.listen(port, () => {
  console.log(`Listening to the port ${port}`)
})