import youtube from "./youtube";

const fetchYouTubeVideos = async (queries) => {
  try {
    console.log("these are all the queries or recipes: ", queries);
    const requests = queries.map((query) =>
      youtube.get("/search", {
        params: { q: query },
      })
    );
    console.log("these are the requests ", requests);
    const responses = await Promise.all(requests);

    // Extract the data from each response
    const videoData = responses.map((response) => response.data.items);

    return videoData;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

export default fetchYouTubeVideos;
