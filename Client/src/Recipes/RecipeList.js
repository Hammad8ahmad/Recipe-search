// RecipeList.js
import React, { useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./items.css";

function RecipeList({ data }) {
  console.log("this is the recipe list data ", data);
  const fullData = data ? data.existingRecipes : null;
  console.log("this is the full data ", fullData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fullData === null || undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

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
