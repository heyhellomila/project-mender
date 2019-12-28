// Import needed to enable DI within the project
import "reflect-metadata";
import { Mediator } from "tsmediator";
import { Container } from "typedi";
import RbqWebCrawler from "../../services/RbqWebCrawler";

export default async () => {
    // Initialize DI
    Container.set("tsmediator", new Mediator());
    Container.set("rbq.webCrawler", new RbqWebCrawler());
};
