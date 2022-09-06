var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require("mongoose");
require('dotenv').config()


var indexRouter = require('./routes/index');


var app = express();

// Database connect 
mongoose.connect(process.env.MONGOURL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });

// Database connect end 

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const splite = (items, splite_data) => {
    var scanResults = {};
    Object.keys(items).forEach(async function (index) {
        if (splite_data != index) {
            scanResults[index] = items[index];
        }
    });
    return scanResults;
};
app.use((req, res, next) => {
    req.splite = splite;
    next();
})

app.use('/', indexRouter);

module.exports = app;
