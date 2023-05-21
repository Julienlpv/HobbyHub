const mongoose = require('mongoose');
const Schema = mongoose.Schema;





// Schéma de données pour les films 
const filmsSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    Author: {type: Schema.Types.String, required: true},
    PageNumber: {type: Schema.Types.Number, required: true},
    Style: {type: Schema.Types.String, required: true},
    Editor: {type: Schema.Types.String, required: true}
}) 

const filmModel = mongoose.model('filmModel',filmsSchema);
module.exports = filmModel;