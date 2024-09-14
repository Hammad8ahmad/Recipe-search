// Items.js
import React from "react";
import RecipeList from "./RecipeList";
import "./items.css";

function Items({ data }) {
  return <RecipeList data={data} />;
}

export default Items;
