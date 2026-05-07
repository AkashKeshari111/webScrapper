import { scrapeStoriesService } from "../services/scraperService.js";
import { sendResponse } from "../utils/response.js";

export const scrapeStories = async (req, res) => {
  try {
    const stories = await scrapeStoriesService();

    return sendResponse(res, 200, true, "Stories scraped successfully", {
      count: stories.length,
      stories,
    });
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
