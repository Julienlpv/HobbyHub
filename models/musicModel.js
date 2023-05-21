const mongoose = require('mongoose');
const Schema = mongoose.Schema;







// Schéma de données pour les musiques
const musicSchema = new Schema({
    songname: {type: Schema.Types.String, required: true},
    Author: {type: Schema.Types.String, required: true},
    Artist: {type: Schema.Types.String, required: true},
    songDuration: {type: Schema.Types.Number, required: true},
    Style: {type: Schema.Types.String, required: true},
    Year: {type: Schema.Types.String, required: true}
}) 

const musicModel = mongoose.model('musicModel', musicSchema);
module.exports = musicModel;