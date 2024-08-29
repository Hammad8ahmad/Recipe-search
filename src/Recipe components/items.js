// Items.js
import React from "react";
import RecipeList from "./RecipeList";
import "./items.css";

function Items({ data, videoId }) {
  return <RecipeList data={data} videoId={videoId} />;
}

export default Items;
