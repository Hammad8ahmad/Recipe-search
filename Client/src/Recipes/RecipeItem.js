// RecipeItem.js
import React from "react";
import VideoList from "./VideoList";
import "./items.css";

function RecipeItem({ recipe, video }) {
  const { image, label, calories, ingredients } = recipe;

  return (
    <div className="recipe">
      <h1 className="label">{label}</h1>
      <img
        loading="lazy"
        src={image}
        alt="cannot display"
        className="recipe-image"
      />
      <h3>Calories : {Math.round(calories)}g</h3>
      <h3 className="ingredients-header">Ingredients : </h3>
      <ul>
        {ingredients.map((i, index) => (
          <li className="ingredients" key={index}>
            {i + "."}
          </li>
        ))}
      </ul>
      <VideoList videos={video} />
    </div>
  );
}

export default RecipeItem;
