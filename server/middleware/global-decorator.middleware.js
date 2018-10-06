const express = require('express');
// var redis   = require("redis");
const cors = require('cors');
const bodyParser = require('body-parser');

const addDb = require('./add-db.middleware');

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200
  }

function globalDecorator(app) {
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(addDb);
    app.use(express.static(__dirname + '/../build'));
}

module.exports = globalDecorator;