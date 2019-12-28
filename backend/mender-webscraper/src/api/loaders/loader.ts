import * as express from "express";
import expressLoader from "./express";
import servicesLoader from "./services";

export default async ({ expressApp }: { expressApp: express.Express }) => {
    // Loads DI
    await servicesLoader();

    // Loads express dependencies
    await expressLoader({ app: expressApp });
};
