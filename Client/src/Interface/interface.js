import React, { useState, useRef } from "react";
import "./interface.css";
import Items from "../Recipes/items";
import { fetchingRecipes } from "../Fetching/fetchData";
import fetchYouTubeVideos from "../Fetching/fetchVideo";
import fetching from "../test";

function Interface() {
  const [recipe, setRecipe] = useState("");
  const [data, setData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [submitted, setSubmitted] = useState(false); // New state to track form submission
  const inputRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!recipe) {
      handleEmptyRecipeInput();
      return;
    } else {
      const recipeInfo = await fetching(recipe);
      console.log("recipe info", recipeInfo);
      setData(recipeInfo);
      setSubmitted(true); // Set submitted to true
      setRecipe("");
    }
  };

  const handleEmptyRecipeInput = () => {
    if (inputRef.current) {
      inputRef.current.placeholder = "Please enter a recipe name";
      inputRef.current.style.border = "2px solid red";
    }
  };

  const resetInputStyles = () => {
    if (inputRef.current) {
      inputRef.current.placeholder =
        "Enter your favorite dish, I'm sure we have it :)";
      inputRef.current.style.border = "1px solid black";
    }
  };

  return (
    <React.Fragment>
      <div className="title-container">
        <h1 className="header">RECIPE SEARCH</h1>
        <div className="paragraph">
          This Edamam recipe API has the data of tens of thousands of foods,
          including international dishes. Enter <b> ANY </b> sort of food (e.g.:
          pasta, chicken enchilada, dumpling, etc.) to see its magic.
        </div>
      </div>
      <form id="form" className="form" onSubmit={submitHandler}>
        <div className="form-input-material">
          <label htmlFor="recipeSearch">
            <input
              ref={inputRef}
              type="text"
              id="recipeSearch"
              name="recipeSearch"
              className="form-control-material"
              placeholder="Enter your favourite dish, I'm sure we have it :)"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
            />
          </label>
        </div>
        <button className="btn btn-primary btn-ghost" type="submit">
          <span>Search</span>
        </button>
      </form>
      {submitted && <Items data={data} />}{" "}
      {/* Conditionally render Items component */}
    </React.Fragment>
  );
}

export default Interface;
