// VideoList.js
import React from "react";
import "./items.css";

function VideoList({ videos }) {
  return (
    <div>
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video, index) => {
          const { id } = video;
          const videoSrc = `https://www.youtube-nocookie.com/embed/${id.videoId}`;
          return (
            <div className="video-tab" key={index}>
              <iframe
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
