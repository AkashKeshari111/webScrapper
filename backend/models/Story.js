import { model, Schema } from "mongoose";

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

const Story = model("Story", storySchema);
export default Story;
