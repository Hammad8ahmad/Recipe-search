// VideoList.js
import React from "react";
import "./items.css";

function VideoList({ videos }) {
  // console.log(videos);
  return (
    <div>
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video, index) => {
          const id = video.videoId;
          const videoSrc = `https://www.youtube.com/embed/${id}`;
          return (
            <div className="video-tab" key={index}>
              <iframe
                loading="lazy"
                className="youtube-video"
                src={videoSrc}
                allowFullScreen
                title="Video player"
              />
            </div>
          );
        })
      ) : (
        <div className="no-videos-message">
          API limit reached.No videos available :(
        </div>
      )}
    </div>
  );
}

export default VideoList;
