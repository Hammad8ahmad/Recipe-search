import React, { useState, useEffect, useRef } from "react";
import "./interface.css";
import Items from "./items";
import { fetching } from "./fetchData";
import { useCallback } from "react";
import apiData from "./testing";
import VideoTemplate from "./videoTemplate";

function Interface() {
  const [recipe, setRecipe] = useState("");
  const [query, setQuery] = useState("noodles");
  const [data, setData] = useState("");
  const [videoId, setVideoId] = useState("noodles");
  const [showModal, setShowModal] = useState(false);
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
  useEffect(() => {
    // console.log(apiData());
    fetching(query).then((res) => {
      setData(res);
      apiData(query).then((res) => {
        setVideoId(res);
      });
    });
  }, [query]);

  // useEffect(() => {
  //   if (!recipe) {
  //     setShowModal(true);
  //   } else {
  //     setShowModal(false);
  //   }
  // }, []);
  return (
    <React.Fragment>
      <div className="title-container">
        <h1 className="header">RECIPE SEARCH</h1>
        <div className="paragraph">
          This Edamam recipe API has the data of tens of thousands of foods,
          including international dishes. Enter <b> ANY </b>sort of food (e.g.:
          pasta, chicken enchilada, dumpling, etc.) to see its magic.
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
      </form>

      {/* <VideoTemplate videoId={videoId}></VideoTemplate> */}
      <Items data={data} videoId={videoId}></Items>
    </React.Fragment>
  );
}

export default Interface;
