import React, { useEffect, useState } from "react";
import "./items.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import apiData from "./testing";

function Items({ data, videoId }) {
  const [loading, Setloading] = useState(true);
  useEffect(() => {
    // console.log(videoId, "in item component");

    console.log(videoId);
    // console.log(data);
    if (!data || !videoId || videoId.length === 0) {
      Setloading(true);
    } else {
      Setloading(false);
    }
  }, [data, videoId]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">
          <PacmanLoader
            color={"black"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="recipes">
          {data.map((item, index) => {
            const individualRecipe = item.recipe;
            const { images, label, calories, ingredients } = individualRecipe;
            const { SMALL } = images;
            const recipeVideos = videoId[index] || []; // Get videos for the current recipe, or an empty array if not available

            return (
              <div className="recipe" key={index}>
                <h1 className="label">{label}</h1>
                <img src={SMALL.url} alt="" className="recipe-image" />
                <h3>Calories : {Math.round(calories)}g</h3>
                <h3>Ingredients : </h3>
                <ul>
                  {ingredients.map((i, index) => {
                    return (
                      <li className="ingredients" key={index}>
                        {i.text}
                      </li>
                    );
                  })}
                </ul>
                <div>
                  {(Array.isArray(recipeVideos) ? recipeVideos : []).map(
                    (video, videoIndex) => {
                      const { id, snippet } = video;
                      const videoSrc = `https://www.youtube.com/embed/${id.videoId}`;
                      return (
                        <div className="video-tab" key={videoIndex}>
                          {/* <h4>{snippet.title}</h4> */}
                          <iframe
                            className="youtube-video"
                            src={videoSrc}
                            allowFullScreen
                            title="Video player"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default Items;
