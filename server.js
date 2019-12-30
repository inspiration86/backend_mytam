const express = require('express');
const helmet = require('helmet')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const expressValidator = require('express-validator');
global.config = require('./modules/config');

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/MytamDB' , { useMongoClient : true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({ type : 'application/json' }));
app.use(expressValidator());
//helmet
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

app.use('/public' , express.static('public'));

const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api' , apiRouter);
app.use('/' , webRouter);

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});