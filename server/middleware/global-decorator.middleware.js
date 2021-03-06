const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const PostgresStore = require('connect-pg-simple')(session);

const addDb = require('./add-db.middleware');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const sessionMiddleWare = session({
    store: new PostgresStore({
        conString: process.env.DB_CONNECTION_STRING,
    }),
    key: 'sid',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
    },
    name: 'biskue'
})

function globalDecorator(app) {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(addDb);
    app.use(express.static(__dirname + '/../build'));
    app.use(cookieParser());
    app.use(sessionMiddleWare)
}

module.exports = { globalDecorator, sessionMiddleWare };