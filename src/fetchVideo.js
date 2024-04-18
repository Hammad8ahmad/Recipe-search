// index.js
import youtube from "./youtube";

const apiData = async (defaultVideo) => {
  try {
    const response = await youtube.get("/search", {
      params: {
        q: defaultVideo,
      },
    });

    return await response.data.items; // Output the response data, not the entire response object
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default apiData; // You don't need to export apiData if you're not using it elsewhere in your code

// JUST FOR TESTING PURPOSES
