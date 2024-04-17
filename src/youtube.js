// youtube.js
import axios from "axios";

const key = "AIzaSyBxdbxJrtko-AS2r2xcdxNSC1JY14h6tw8"; // Replace "YOUR_YOUTUBE_API_KEY" with your actual API key

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    fields: "items(id/videoId,snippet/title)",
    maxResults: 1,
    key: key,
  },
});

export default youtube;
