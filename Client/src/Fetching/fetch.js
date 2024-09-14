const fetching = async (recipe) => {
  console.log(recipe);
  const url = process.env.REACT_APP_API_URL;
  const response = await fetch(`${url}fetch-recipes-videos`, {
    method: "POST",
    body: JSON.stringify({ query: recipe }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  return json;
};

export default fetching;
