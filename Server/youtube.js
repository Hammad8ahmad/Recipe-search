import axios from "axios";

const API_KEY = "AIzaSyBxdbxJrtko-AS2r2xcdxNSC1JY14h6tw8";

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
