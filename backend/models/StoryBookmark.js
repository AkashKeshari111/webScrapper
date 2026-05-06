import { model, Schema } from "mongoose";

const storyBookmarkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
    },

    points: {
      type: Number,
      default: 0,
      index: true,
    },

    author: {
      type: String,
      index: true,
    },

    postedAt: {
      type: Date,
    },

    sourceId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const StoryBookmark = model("StoryBookmark", storyBookmarkSchema);
export default StoryBookmark;
