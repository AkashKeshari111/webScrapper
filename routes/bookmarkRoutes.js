import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { getBookmarks } from "../controllers/storyController.js";

const bookmarkRouter = express.Router();

bookmarkRouter.get("/user/bookmarks", authMiddleware, getBookmarks);

export default bookmarkRouter;
