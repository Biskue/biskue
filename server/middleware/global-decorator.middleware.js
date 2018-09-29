const express = require('express');
// var redis   = require("redis");
const cors = require('cors');
const bodyParser = require('body-parser');

const addDb = require('./add-db.middleware');

function globalDecorator(app) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(addDb);
    app.use(express.static(__dirname + '/../build'));
}

module.exports = globalDecorator;