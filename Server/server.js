// import dotenv from "dotenv";
// import express from "express";
// import { connectDB } from "./database/db.js";
// import Recipe from "./models/recipes.js";
// import fetchYouTubeVideos from "./fetchVid.js";
// import Video from "./models/videos.js";
// import cors from "cors";

// dotenv.config();

// const app = express();
// const appKey = process.env.EDAMAM_APP_KEY;
// const appId = process.env.EDAMAM_APP_ID;

// // Middleware to log requests
// app.use(express.json());
// app.use(cors());
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// app.post("/fetch-recipes-videos", async (req, res) => {
//   const query = req.body.query;

//   try {
//     // Function to fetch recipes from the external API
//     const fetchingRecipes = async (query) => {
//       try {
//         const response = await fetch(
//           `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`
//         );
//         const data = await response.json();
//         return data.hits.slice(0, 5); // Return only the top 5 results
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//         throw error;
//       }
//     };

//     // Fetch new recipes from the external API
//     const recipes = await fetchingRecipes(query);

//     // Map recipes to extract the needed fields
//     const recipeContent = recipes.map((recipe) => {
//       const { label, images, calories, ingredients } = recipe.recipe;
//       const image = images.SMALL.url; // Get the image URL
//       const fixedIngredients = ingredients.map((ing) => ing.text);

//       return {
//         label: label.toLowerCase(),
//         image, // Include the image URL in the response
//         calories,
//         ingredients: fixedIngredients,
//       };
//     });

//     // Fetch existing recipes in a single query
//     const recipeLabels = recipeContent.map((recipe) => recipe.label);
//     const existingRecipes = await Recipe.find({ label: { $in: recipeLabels } });
//     const existingRecipeMap = new Map(
//       existingRecipes.map((recipe) => [recipe.label, recipe])
//     );

//     // Filter out new recipes that do not exist in the database
//     const newRecipes = recipeContent.filter(
//       (recipe) => !existingRecipeMap.has(recipe.label)
//     );

//     // Fetch associated videos for existing recipes
//     const existingRecipesWithVideos = await Promise.all(
//       existingRecipes.map(async (existingRecipe) => {
//         const associatedVideos = await Video.find({
//           recipeId: existingRecipe._id,
//         });
//         return { recipe: existingRecipe, videos: associatedVideos };
//       })
//     );

//     // Function to fetch and save YouTube videos for each recipe
//     const fetchAndSaveVideos = async (recipe) => {
//       const mainLabel = recipe.label;
//       const videos = await fetchYouTubeVideos(mainLabel); // Fetch video data

//       return Promise.all(
//         videos.map(async (videoData) => {
//           const { videoId } = videoData.id; // Extract videoId from response
//           const { title } = videoData.snippet; // Extract title from snippet

//           // Create new video object with the recipe ID
//           const newVideo = new Video({ videoId, title, recipeId: recipe._id });

//           // Save to database
//           await newVideo.save();
//           return newVideo;
//         })
//       );
//     };

//     // Save new recipes and fetch videos concurrently
//     const savedRecipes = await Promise.all(
//       newRecipes.map(async (recipe) => {
//         const newRecipe = new Recipe({
//           label: recipe.label,
//           calories: recipe.calories,
//           ingredients: recipe.ingredients,
//           // Do not include the image URL here
//         });
//         await newRecipe.save();
//         return newRecipe;
//       })
//     );

//     // Fetch and save videos for saved recipes
//     const savedRecipesWithVideos = await Promise.all(
//       savedRecipes.map(async (newRecipe) => {
//         const videos = await fetchAndSaveVideos(newRecipe);
//         return { recipe: newRecipe, videos: videos };
//       })
//     );

//     // Combine existing and new recipes with videos
//     const allRecipesWithVideos = [
//       ...existingRecipesWithVideos,
//       ...savedRecipesWithVideos,
//     ];

//     // Create a map of recipes to images for easy lookup
//     const recipeImagesMap = new Map(
//       recipeContent.map((recipe) => [recipe.label, recipe.image])
//     );

//     // Send response with combined recipes and images
//     res.status(200).json({
//       message: "Data successfully added or retrieved.",
//       recipes: allRecipesWithVideos.map((item) => ({
//         recipe: {
//           ...item.recipe.toObject(),
//           image: recipeImagesMap.get(item.recipe.label),
//         },
//         videos: item.videos,
//       })),
//     });
//   } catch (error) {
//     console.error("Error fetching or saving recipes:", error);
//     res
//       .status(400)
//       .json({ message: "There is an error", error: error.message });
//   }
// });

// // Listening for requests
// app.listen(process.env.PORT || 4000, () => {
//   connectDB();
//   console.log("Listening on port 4000");
// });

import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import Recipe from "./models/recipes.js";
import fetchYouTubeVideos from "./fetchVid.js";
import Video from "./models/videos.js";
import cors from "cors";

dotenv.config();

const app = express();
const appKey = process.env.EDAMAM_APP_KEY;
const appId = process.env.EDAMAM_APP_ID;

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Utility function to fetch recipes
const fetchRecipes = async (query) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=5`
    );
    const data = await response.json();
    return data.hits;
    // console.log(data.hits);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Utility function to process recipes
const processRecipes = (recipes) => {
  return recipes.map(({ recipe }) => {
    const { label, images, calories, ingredients } = recipe;
    return {
      label: label.toLowerCase(),
      image: images.SMALL.url,
      calories,
      ingredients: ingredients.map((ing) => ing.text),
    };
  });
};

// Endpoint to fetch recipes and videos
app.post("/fetch-recipes-videos", async (req, res) => {
  const query = req.body.query;

  try {
    // Fetch and process recipes
    const recipes = await fetchRecipes(query);
    const recipeContent = processRecipes(recipes);

    const recipeLabels = recipeContent.map((recipe) => recipe.label);

    // Fetch existing recipes and videos
    const existingRecipes = await Recipe.find({ label: { $in: recipeLabels } });
    const existingRecipeMap = new Map(
      existingRecipes.map((recipe) => [recipe.label, recipe])
    );

    const newRecipes = recipeContent.filter(
      (recipe) => !existingRecipeMap.has(recipe.label)
    );
    const existingRecipesWithVideos = await Promise.all(
      existingRecipes.map(async (existingRecipe) => {
        const associatedVideos = await Video.find({
          recipeId: existingRecipe._id,
        });
        return { recipe: existingRecipe, videos: associatedVideos };
      })
    );

    // Function to fetch and save videos
    const fetchAndSaveVideos = async (recipe) => {
      const videos = await fetchYouTubeVideos(recipe.label);
      const videoDocs = videos.map((videoData) => ({
        videoId: videoData.id.videoId,
        title: videoData.snippet.title,
        recipeId: recipe._id,
      }));
      await Video.bulkWrite(
        videoDocs.map((video) => ({
          insertOne: { document: video },
        }))
      );
      return videoDocs;
    };

    // Save new recipes and fetch videos concurrently
    const savedRecipes = await Recipe.insertMany(
      newRecipes.map((recipe) => ({
        label: recipe.label,
        calories: recipe.calories,
        ingredients: recipe.ingredients,
      }))
    );

    const savedRecipesWithVideos = await Promise.all(
      savedRecipes.map(async (newRecipe) => {
        const videos = await fetchAndSaveVideos(newRecipe);
        return { recipe: newRecipe, videos };
      })
    );

    // Combine existing and new recipes with videos
    const allRecipesWithVideos = [
      ...existingRecipesWithVideos,
      ...savedRecipesWithVideos,
    ];

    const recipeImagesMap = new Map(
      recipeContent.map((recipe) => [recipe.label, recipe.image])
    );

    res.status(200).json({
      message: "Data successfully added or retrieved.",
      recipes: allRecipesWithVideos.map(({ recipe, videos }) => ({
        recipe: {
          ...recipe.toObject(),
          image: recipeImagesMap.get(recipe.label),
        },
        videos,
      })),
    });
  } catch (error) {
    console.error("Error fetching or saving recipes:", error);
    res
      .status(400)
      .json({ message: "There is an error", error: error.message });
  }
});

// Start server
app.listen(process.env.PORT || 4000, () => {
  connectDB();
  console.log("Listening on port 4000");
});
