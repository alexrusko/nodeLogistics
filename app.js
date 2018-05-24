const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('static'));

require('./routes/vehicleList')(app);
require('./routes/vehicleDetails')(app);
require('./routes/productList')(app);

app.use('/', function(req, res, next) {
    res.redirect('/vehicles');
});

app.use(function (err, req, res, next) {
    res.status(500).send('Hiba: ' + err);
    console.error(err.stack || err);
});

const server = app.listen(3000, function () {
    console.log('server is running on port 3000.');
});