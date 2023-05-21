const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: String, required: true },
  title: {type: String, required: true}
});


const favoriteModel = mongoose.model('Favorite', favoriteSchema);
module.exports = favoriteModel;