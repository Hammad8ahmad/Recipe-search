import React from "react";

const key = "80bab0508a352ffd15e450386a26bc4c	";
const id = "a9b30405";
export const fetching = async (defaultQuery) => {
  try {
    const api = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=a9b30405&app_key=%2080bab0508a352ffd15e450386a26bc4c`
    );
    const data = await api.json();

    return await data.hits.slice(0, 5);
  } catch (e) {
    console.log(e, "something went wrong");
    return e;
  }
};
