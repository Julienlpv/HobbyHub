// CRUD CREATE READ UPDATE DELETE  

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jujuodusseus:95200-Sar@hobbyhubcluster.xawna3v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

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
    firstname: {type: Schema.Types.String, required: true},
    lastname: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true},
    registerDate: {type: Schema.Types.Date, required: true},
    birthDate: {type: Schema.Types.Date, required: true},
    Year: {type: Schema.Types.Number, required: true}
}) 

const musicModel = mongoose.model('musicModel', musicSchema);
const bookModel = mongoose.model('bookModel', bookSchema);
const filmModel = mongoose.model('filmModel',filmsSchema);
const userModel = mongoose.model('userModel', userSchema);

module.exports = bookModel;
module.exports = filmModel;
module.exports = musicModel;
module.exports = userModel;



async function main() {
    await client.connect();
    console.log('connexion OK!');
    return "done :D";
    addbook();

    
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

  // Insérer le livre dans la collection de livres
  await newBook.save();

  // Récupérer le premier livre dans la collection de livres
  const firstBook = await bookModel.findOne();

  // Afficher les détails du livre
  console.log(firstBook);
}

testInsertBook();




main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());



