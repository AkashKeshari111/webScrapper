import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

export const scrapeStoriesService = async () => {
  const { data } = await axios.get("https://news.ycombinator.com/");

  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").each((index, element) => {
    if (index >= 10) return false;

    const title = $(element).find(".titleline a").text().trim();

    const url = $(element).find(".titleline a").attr("href");

    const subtext = $(element).next();

    const points = parseInt(subtext.find(".score").text()) || 0;

    const author = subtext.find(".hnuser").text().trim() || "Unknown";

    const sourceId = $(element).attr("id");

    if (!title || !sourceId) return;

    stories.push({
      title,
      url,
      points,
      author,
      sourceId,
      postedAt: new Date(),
    });
  });

  const operations = stories.map((story) => ({
    updateOne: {
      filter: { sourceId: story.sourceId },
      update: { $set: story },
      upsert: true,
    },
  }));

  if (operations.length > 0) {
    await Story.bulkWrite(operations);
  }

  return stories;
};
