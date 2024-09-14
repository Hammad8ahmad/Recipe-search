import React, { useState, useRef } from "react";
import "./interface.css";
import Items from "../Recipes/items";
import fetching from "../Fetching/fetch";
import MoonLoader from "react-spinners/MoonLoader";

function Interface() {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false); // Set and use loading state properly
  const [data, setData] = useState(null);
  const inputRef = useRef(null);
  console.log("checking renders");
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!recipe) {
      handleEmptyRecipeInput();
      return;
    } else {
      setLoading(true); // Start loading when fetching data
      try {
        const recipeInfo = await fetching(recipe);
        // console.log("recipe info", recipeInfo);
        setData(recipeInfo);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
        setRecipe(""); // Clear input after fetching
        resetInputStyles(); // Reset input styles after fetching
      }
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
              placeholder="Enter your favorite dish, I'm sure we have it :)"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)} // Set recipe state on input change
            />
          </label>
        </div>
        <button
          className="btn btn-primary btn-ghost"
          type="submit"
          disabled={loading}
        >
          <span>{loading ? "Loading..." : "Search"}</span>
        </button>
      </form>
      {loading ? (
        <div className="loader">
          <MoonLoader />
        </div>
      ) : (
        <Items data={data} />
      )}
    </React.Fragment>
  );
}

export default Interface;
