const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;
const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;

export const fetchingRecipes = async (query) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data.hits.slice(0, 5); // Return only the top 5 results
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
