import bodyParser from "body-parser";
import cors from "cors";
import * as express from "express";
import * as swaggerUi from "swagger-ui-express";
import "../controllers/licenseController";
import errorHandler from "../middlewares/errorHandler";
import { RegisterRoutes } from "../routes/routes";

export default async ({ app }: { app: express.Express }) => {
    /**
     * Health Check endpoints
     */
    app.get("/status", (req, res) => {
        res.status(200).end();
    });
    app.head("/status", (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable("trust proxy");

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middlewares
    app.use(bodyParser.json());

    // Swagger
    try {
        const swaggerDoc = require("../../../swagger.json");
        app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    } catch (e) {
        console.error("Unable to read swagger.json", e);
    }

    // API routes
    RegisterRoutes(app);

    // Error Handler Middlewares
    app.use(errorHandler);
};
