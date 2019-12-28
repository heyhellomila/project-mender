import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const envFound = dotenv.config({
    path: `./src/api/config/environment/${process.env.NODE_ENV}.env`
});

if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    // Port config
    port: parseInt(process.env.PORT as string, 10),

    // API configs
    api: {
        prefix: "/api"
    },

    // Web Crawler's Urls
    rbqBaseUrl: process.env.RBQ_URL as string
};
