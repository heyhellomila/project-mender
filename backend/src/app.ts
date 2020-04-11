import { Router } from './controllers';
import { createConnection } from 'typeorm';
import express from 'express';
import * as config from './config.json';
import { loggerFactory } from "../logger-config";

const log = loggerFactory.getLogger("startup.App");

require('dotenv/config');

createConnection({
    type: 'mysql',
    host: process.env.RDS_HOSTNAME,
    port: Number(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    entities : [
        'src/entities/*.ts',
    ],
    synchronize : false,
    timezone: 'Z',
}).then(() => {
    console.log('Connected to database');

    const app = express();
    const router : Router = new Router();

    app.use(express.json());
    app.use(router.getRouter());

    app.listen(config.SERVER_PORT, () => {
        console.log(`Running server on port ${config.SERVER_PORT}`);
        log.info(`Running server on port ${config.SERVER_PORT}`);
        // Add logger here to show app is now running
    });
});
