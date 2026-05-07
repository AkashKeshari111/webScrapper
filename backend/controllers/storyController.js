import mongoose from "mongoose";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { sendResponse } from "../utils/response.js";

export const getStories = async (req, res) => {
  try {
    const { page: pageQuery, limit: limitQuery } = req.query;

    const page = Math.max(Number(pageQuery) || 1, 1);

    const limit = Math.min(Math.max(Number(limitQuery) || 10, 1), 50);

    const skip = (page - 1) * limit;

    const [stories, totalStories] = await Promise.all([
      Story.find().sort({ points: -1 }).skip(skip).limit(limit),

      Story.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalStories / limit);

    return sendResponse(
      res,
      200,
      true,
      "Stories fetched successfully",
      stories,
      {
        currentPage: page,
        totalPages,
        totalStories,
        limit,
      },
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Failed to fetch stories");
  }
};

export const getSingleStory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid story id");
    }

    const story = await Story.findById(id);

    if (!story) {
      return sendResponse(res, 404, false, "Story not found");
    }

    return sendResponse(res, 200, true, "Story fetched successfully", story);
  } catch (error) {
    return sendResponse(res, 500, false, "Failed to fetch story");
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;
    const user = await User.findById(req.user.id);

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return sendResponse(res, 400, false, "Invalid story id");
    }

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === storyId,
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    return sendResponse(
      res,
      200,
      true,
      alreadyBookmarked ? "Bookmark removed" : "Bookmark added",
      user.bookmarks,
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Failed to toggle bookmark");
  }
};
