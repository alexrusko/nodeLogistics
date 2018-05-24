const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PVBANS');

module.exports = mongoose;