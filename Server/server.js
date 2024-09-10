import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import Recipe from "./models/recipes.js";
import fetchYouTubeVideos from "./fetchVid.js";

dotenv.config();

const app = express();
const appKey = "80bab0508a352ffd15e450386a26bc4c";
const appId = "a9b30405";

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/fetch-recipes-videos", async (req, res) => {
  const query = "orange"; // Replace with dynamic query if needed

  try {
    // Check if the recipe already exists in the database (by label in lowercase)
    // const existingRecipe = await Recipe.findOne({ query: query.toLowerCase() });
    const existingRecipe = await Recipe.findOne({
      label: { $regex: query, $options: "i" },
    });
    // console.log(existingRecipe);

    if (existingRecipe) {
      return res.status(200).json({
        message: "Recipe already exists",
        recipe: existingRecipe,
      });
    }

    // Function to fetch recipes from the API
    const fetchingRecipes = async (query) => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`
        );
        const data = await response.json();
        return data.hits.slice(0, 1); // Return only the top result
      } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
      }
    };

    // Fetch new recipes if not found in the database
    const recipes = await fetchingRecipes(query);

    // Map recipes to extract the needed fields
    const recipeContent = recipes.map((recipe) => {
      const { label, images, calories, ingredients } = recipe.recipe;
      const image = images.SMALL.url;
      const fixedIngredients = ingredients.map((ing) => ing.text);

      // Return the recipe with the label in lowercase
      return {
        label: label.toLowerCase(),
        image,
        calories,
        ingredients: fixedIngredients,
      };
    });

    // Looping through each recipe label and getting the video data from Youtube api
    for (const label of recipeContent) {
      const mainLabel = label.label;
      const test = await fetchYouTubeVideos(mainLabel);
      console.log(test);
    }
    // Save each recipe to the database
    const savedRecipes = [];
    for (const recipe of recipeContent) {
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();
      savedRecipes.push(newRecipe); // Collect saved recipes
    }

    // Send response with saved recipes
    res.status(200).json({
      message: "Data successfully added",
      recipes: savedRecipes,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is an error", error: error.message });
  }
});

// Listening for requests
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Listening on port 4000");
});
