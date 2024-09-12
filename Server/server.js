import dotenv from "dotenv";
import express from "express"; // Ensure to import fetch if it's not already available in your environment
import { connectDB } from "./database/db.js";
import Recipe from "./models/recipes.js";
import fetchYouTubeVideos from "./fetchVid.js";
import Video from "./models/videos.js";
import cors from "cors";

dotenv.config();

const app = express();
const appKey = "80bab0508a352ffd15e450386a26bc4c";
const appId = "a9b30405";

// Middleware to log requests
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.post("/fetch-recipes-videos", async (req, res) => {
  const query = req.body.query; // Replace with dynamic query if needed

  try {
    // Function to fetch recipes from the API
    const fetchingRecipes = async (query) => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`
        );
        const data = await response.json();
        return data.hits.slice(0, 5); // Return only the top 5 results
      } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
      }
    };

    // Fetch new recipes from the external API
    const recipes = await fetchingRecipes(query);

    // Map recipes to extract the needed fields
    const recipeContent = recipes.map((recipe) => {
      const { label, images, calories, ingredients } = recipe.recipe;
      const image = images.SMALL.url;
      console.log(image);
      const fixedIngredients = ingredients.map((ing) => ing.text);

      return {
        label: label.toLowerCase(),
        image,
        calories,
        ingredients: fixedIngredients,
      };
    });

    // Check for existing recipes in the database
    const existingRecipes = [];
    const newRecipes = [];

    for (const recipe of recipeContent) {
      const existingRecipe = await Recipe.findOne({ label: recipe.label });

      if (existingRecipe) {
        // Fetch the associated videos for the existing recipe
        const associatedVideos = await Video.find({
          recipeId: existingRecipe._id,
        });
        existingRecipes.push({
          recipe: existingRecipe,
          videos: associatedVideos,
        }); // Collect existing recipes with their videos
      } else {
        newRecipes.push(recipe); // Collect new recipes to be added
      }
    }

    if (existingRecipes.length > 0) {
      // Return existing recipes and their videos if found
      return res.status(200).json({
        message: "Some recipes already exist in the database.",
        existingRecipes,
      });
    }

    // Array to store saved videos
    const savedVideos = [];

    // Save new recipes to the database and fetch YouTube videos for each
    const savedRecipes = [];
    for (const recipe of newRecipes) {
      // Save the new recipe
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();
      savedRecipes.push(newRecipe); // Collect saved recipes

      // Fetch YouTube videos for the newly saved recipe
      const mainLabel = newRecipe.label;
      const videos = await fetchYouTubeVideos(mainLabel); // Fetch video data

      for (const videoData of videos) {
        const { videoId } = videoData.id; // Extract videoId from response
        const { title } = videoData.snippet; // Extract title from snippet

        // Create new video object with the recipe ID
        const newVideo = new Video({ videoId, title, recipeId: newRecipe._id });

        // Save to database
        await newVideo.save();
        savedVideos.push(newVideo); // Add saved video to the array
      }
    }
    if (savedRecipes && savedVideos > 0) {
      // Send response with saved recipes and videos
      res.status(200).json({
        message: "Data successfully added",
        recipes: savedRecipes,
        videos: savedVideos,
      });
    } else {
      res.status(400).json({
        message: "Plz type any recipe",
      });
    }
  } catch (error) {
    console.error("Error fetching or saving recipes:", error);
    res
      .status(400)
      .json({ message: "There is an error", error: error.message });
  }
});

// Listening for requests
app.listen(process.env.PORT || 4000, () => {
  connectDB();
  console.log("Listening on port 4000");
});
