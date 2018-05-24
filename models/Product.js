const Schema = require('mongoose').Schema;
const mongoose = require('../config/db');

let Product = mongoose.model('Product', {
    name: String,
    unitPrice: Number,
    imageUrl: String
});

module.exports = Product;