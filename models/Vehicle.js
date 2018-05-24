const Schema = require('mongoose').Schema;
const mongoose = require('../config/db');

let Vehicle = mongoose.model('Vehicle', {
    type: String,
    licensePlate: String,
    imageUrl: String,
    state: String,
    maxCapacity: Number,
    currentCapacity: Number,
    _storage: [{
        type: Schema.Types.ObjectId,
        ref: 'TransferItem'
    }],
});

module.exports = Vehicle;