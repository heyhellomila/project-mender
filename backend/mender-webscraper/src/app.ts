import express from "express";
import config from "./api/config/config";

async function startServer() {
    const app = express();

    // Loads App's dependencies
    await require("./api/loaders/loader").default({ expressApp: app });

    app.listen(config.port, () => console.log("Server running"));
}

startServer();
