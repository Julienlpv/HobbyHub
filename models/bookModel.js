const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const booksRouter = require('../routes/books');

const bookSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    Author: {type: Schema.Types.String, required: true},
    PageNumber: {type: Schema.Types.Number, required:false},
    Style: {type: Schema.Types.String, required: true},
  Editor: { type: Schema.Types.String, required: true },
    Description: { type: Schema.Types.String, required: false }
}) 


const bookModel = mongoose.model('bookModel',bookSchema);
module.exports = bookModel;