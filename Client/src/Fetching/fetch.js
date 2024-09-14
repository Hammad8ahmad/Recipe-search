const fetching = async (recipe) => {
  console.log(recipe);
  const response = await fetch(`http://localhost:4000/fetch-recipes-videos`, {
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
