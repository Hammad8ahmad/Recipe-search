// index.js
import youtube from "./youtube";

const apiData = async (defaultVideo) => {
  try {
    const response = await youtube.get("/search", {
      params: {
        q: defaultVideo,
      },
    });

    return await response.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default apiData; 