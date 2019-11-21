import { Router } from './controllers/index';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';

require('dotenv/config');

createConnection({
    type: 'mysql',
    host: process.env.RDS_HOSTNAME,
    port: Number(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    entities : [
        'src/entities/*.ts'
        ],
    synchronize : true
}).then(connection => {
    console.log('Connected to database');

    const express = require('express');
    const config = require('./config');
    const { SERVER_PORT } = config;
    const app = express();
    const router : Router = new Router();

    app.use(express.json());
    app.use(router.getRouter());

    app.get('/', (req: Request, res: Response) => res.send('Mender backend'));

    app.listen(SERVER_PORT, () => {
        console.log(`Running server on port ${SERVER_PORT}`)});
    
});
