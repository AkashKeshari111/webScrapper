import express from "express";
import { scrapeStories } from "../controllers/scraperController.js";

const scraperRouter = express.Router();

scraperRouter.get("/scrape", scrapeStories);

export default scraperRouter;
