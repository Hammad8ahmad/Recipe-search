import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId, // References the ObjectId type
      ref: "Recipe", // Refers to the Recipe model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Video = mongoose.model("Video", videoSchema);
export default Video;
