// RecipeList.js
import React, { useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./items.css";

function RecipeList({ data, videoId }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data === null || videoId === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data, videoId]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">YOU CURRENTLY HAVE NO SEARCHED RECIPES :)</div>
      ) : (
        <div className="recipes">
          {data &&
            data.map((item, index) => (
              <RecipeItem
                key={index}
                recipe={item.recipe}
                video={Array.isArray(videoId) ? videoId[index] : []}
              />
            ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default RecipeList;
