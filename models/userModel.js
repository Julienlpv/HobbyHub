const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Schéma de données pour les utilisateurs
// // Schéma de données pour les utilisateurs
const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true },
    password: {type: Schema.Types.String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]
}) 


const User = mongoose.model('User',userSchema);
module.exports = User;



//////////////////////// MIDDLEWARE DE HACHAGE /////////////////////////////////

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});