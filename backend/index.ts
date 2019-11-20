import { router } from './controllers/index';
import { Request, Response } from 'express';

const express = require('express');
const config = require('./config');

const { SERVER_PORT } = config;
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => res.send('Mender backend'));

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true , useUnifiedTopology: true}, 
    () => console.log('connected to db')
)

app.listen(SERVER_PORT, () => {
    console.log(`Running server on port ${SERVER_PORT}`);
});

export default app;
