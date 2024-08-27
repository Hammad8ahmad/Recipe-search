import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    fields: "items(id/videoId,snippet/title)",
    maxResults: 1,
    key: API_KEY,
  },
});

export default youtube;
