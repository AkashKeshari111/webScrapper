import express from "express";
import {
  getSingleStory,
  getStories,
  toggleBookmark,
} from "../controllers/storyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const storyRouter = express.Router();

storyRouter.get("/", getStories);
storyRouter.get("/:id", getSingleStory);
storyRouter.post("/:id/bookmark", authMiddleware, toggleBookmark);

export default storyRouter;
