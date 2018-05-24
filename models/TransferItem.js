const Schema = require('mongoose').Schema;
const mongoose = require('../config/db');

let TransferItem = mongoose.model('TransferItem', {
    quantity: Number,
    value: Number,
    name: String,
    imageUrl: String
});

module.exports = TransferItem;