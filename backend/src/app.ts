import { Router } from './controllers/index';
import { createConnection } from 'typeorm';
import express from 'express';
import * as config from './config.json';

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
    synchronize : false,
    timezone: 'Z'
}).then(connection => {
    console.log('Connected to database');

    const app = express();
    const router : Router = new Router();

    app.use(express.json());
    app.use(router.getRouter());

    app.listen(config.SERVER_PORT, () => {
        console.log(`Running server on port ${config.SERVER_PORT}`)});
    
});
