import React, { useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./items.css";

function RecipeList({ data }) {
  const fullData = data ? data.existingRecipes || data.recipes : null; // Extract the recipes from data

  const [loading, setLoading] = useState(true);
  console.log(fullData);
  useEffect(() => {
    if (!fullData || fullData.length === 0) {
      // Correct checks for data loading state
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fullData]); // Run the effect only when `fullData` changes

  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">YOU CURRENTLY HAVE NO SEARCHED RECIPES :)</div>
      ) : (
        <div className="recipes">
          {fullData &&
            fullData.map((item, index) => (
              <RecipeItem
                key={index}
                recipe={item.recipe}
                video={item.videos}
              />
            ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default RecipeList;
