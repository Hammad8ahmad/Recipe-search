import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
