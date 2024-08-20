import React, { useState, useEffect, useRef } from "react";
import "./interface.css";
import Items from "./items";
import { fetching } from "./fetchData";
import apiData from "./fetchVideo";

function Interface() {
  const [recipe, setRecipe] = useState("");
  const [query, setQuery] = useState("noodles");
  const [data, setData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const inputRef = useRef(null);

  //  FORM HANDLER
  const submitHandler = (e) => {
    e.preventDefault();
    if (!recipe) {
      inputRef.current.placeholder = "plz write a recipe";
      inputRef.current.style.border = "2px solid red";
    } else {
      inputRef.current.placeholder =
        "Enter your favourite dish, I'm sure we have it :)";
      inputRef.current.style.border = "1px solid black";
      fetching(recipe).then((res) => {
        setData(res);
        // console.log(data);

        const specificRecipe = (res) => {
          // console.log(res);
          return res.map((item) => {
            const { recipe } = item;

            return recipe.label;
          });
        };
        // console.log(specificRecipe(res));
        const recName = specificRecipe(res);

        const promises = recName.map((item) => {
          return apiData(item);
        });

        Promise.all(promises).then((results) => {
          const newArr = results.map((res) => {
            // Process each result as needed
            return res;
          });
          setVideoId(newArr);
        });
      });
      setRecipe("");
    }
  };

  return (
    <React.Fragment>
      <div className="title-container">
        <h1 className="header">RECIPE SEARCH</h1>
        <div className="paragraph">
          This Edamam recipe API has the data of tens of thousands of foods,
          including international dishes. Enter <b> ANY </b>sort of food (e.g.:
          pasta, chicken enchilada, dumpling, etc.) to see its magic.
        </div>
        <div className="note">
          <b>|IMPORTANT NOTE| </b> ONLY PEOPLE WHO CAN MAKE GOOD BROWNIES CAN
          USE THIS SO PLZ IF YOU CANNOT MAKE GOOD BROWNIES(CRUNCHY) LEAVE THE
          THE SITE IMMEDIATELY!🐥
        </div>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-input-material">
          <input
            ref={inputRef}
            type="text"
            id="recipeSearch"
            name="recipeSearch"
            className="form-control-material"
            placeholder="Enter your favourite dish, I'm sure we have it :)"
            value={recipe}
            onChange={(e) => {
              setRecipe(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-primary btn-ghost">
          <span>Search</span>
        </button>
      </form>{" "}
      <Items data={data} videoId={videoId}></Items>
    </React.Fragment>
  );
}

export default Interface;
