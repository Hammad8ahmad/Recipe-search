import React, { useState, useRef } from "react";
import "./interface.css";
import Items from "./items";
import { fetchingRecipes } from "./fetchData";
import fetchYouTubeVideos from "./fetchVideo";

function Interface() {
  const [recipe, setRecipe] = useState("");
  const [data, setData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const inputRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!recipe) {
      handleEmptyRecipeInput();
      return;
    }

    resetInputStyles();
    const recipeData = await fetchingRecipes(recipe);
    setData(recipeData);

    const recipeNames = extractRecipeNames(recipeData);
    const videoData = await fetchVideosForRecipes(recipeNames);
    setVideoId(videoData);

    setRecipe("");
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

  const extractRecipeNames = (recipes) => {
    return recipes.map((item) => item.recipe.label);
  };

  const fetchVideosForRecipes = async (recipeNames) => {
    const videoPromises = recipeNames.map((name) => fetchYouTubeVideos(name));
    const videoResults = await Promise.all(videoPromises);
    return videoResults;
  };

  return (
    <React.Fragment>
      <div className="title-container">
        <h1 className="header">RECIPE SEARCH :)</h1>
        <div className="paragraph">
          This Edamam recipe API has the data of tens of thousands of foods,
          including international dishes. Enter <b> ANY </b> sort of food (e.g.:
          pasta, chicken enchilada, dumpling, etc.) to see its magic.
        </div>
        <div className="note">
          <b>|EASTER EGG FOR MOBILE USERS ;)| </b> ONLY PEOPLE WHO CAN MAKE GOOD
          BROWNIES CAN USE THIS SO PLEASE LEAVE THE SITE IMMEDIATELY IF YOU
          CANNOT MAKE GOOD BROWNIES(CRUNCHY)!
        </div>
      </div>
      <form id="form" className="form" onSubmit={submitHandler}>
        <div className="form-input-material">
          <label htmlFor="recipeSearch">
            {" "}
            {/* htmlFor should match the id of the input */}
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
      <Items data={data} videoId={videoId} />
    </React.Fragment>
  );
}

export default Interface;
