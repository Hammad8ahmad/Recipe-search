import React, { useEffect, useState } from "react";
import "./items.css";

function Items({ data, videoId }) {
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
            data.map((item, index) => {
              const individualRecipe = item.recipe;
              const { images, label, calories, ingredients } = individualRecipe;
              const { SMALL } = images;
              const recipeVideos = Array.isArray(videoId)
                ? videoId[index] || []
                : [];

              return (
                <div className="recipe" key={index}>
                  <h1 className="label">{label}</h1>
                  <img
                    loading="lazy"
                    src={SMALL.url}
                    alt=""
                    className="recipe-image"
                  />

                  <h3>Calories : {Math.round(calories)}g</h3>
                  <h3 className="ingredients-header">Ingredients : </h3>
                  <ul>
                    {ingredients.map((i, index) => (
                      <li className="ingredients" key={index}>
                        {i.text + "."}
                      </li>
                    ))}
                  </ul>
                  <div>
                    {Array.isArray(recipeVideos) &&
                      recipeVideos.map((video, videoIndex) => {
                        const { id } = video;
                        const videoSrc = `https://www.youtube-nocookie.com/embed/${id.videoId}`;
                        return (
                          <div className="video-tab" key={videoIndex}>
                            <iframe
                              className="youtube-video"
                              src={videoSrc}
                              allowFullScreen
                              title="Video player"
                            />
                          </div>
                        );
                      })}
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
