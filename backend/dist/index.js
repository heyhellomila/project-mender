"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./controllers/index");
const express = require('express');
const config = require('./config');
const { SERVER_PORT } = config;
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
app.use(express.json());
app.use(index_1.router);
app.get('/', (req, res) => res.send('Mender backend'));
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'));
app.listen(SERVER_PORT, () => {
    console.log(`Running server on port ${SERVER_PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map