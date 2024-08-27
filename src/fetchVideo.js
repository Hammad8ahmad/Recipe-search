import youtube from "./youtube";

const fetchYouTubeVideos = async (query) => {
  try {
    const response = await youtube.get("/search", {
      params: {
        q: query,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

export default fetchYouTubeVideos;
