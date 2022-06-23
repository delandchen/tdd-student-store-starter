const storeRouter = require('./routes/store');
const express = require('express');
const cors = require('cors')

const app = express();

// Middleware
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/store", storeRouter);

app.get('/', (req, res) => {
    res.status(200).send({ "ping": "pong" });
});

module.exports = app;
