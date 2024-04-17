import React, { useEffect } from "react";

function VideoTemplate({ videoId }) {
  useEffect(() => {
    console.log("////////");
    console.log(videoId);
    console.log("////////");
  }, [videoId]);
  return (
    <React.Fragment>
      {videoId.map((item) => {
        const { id } = item;
        console.log(id);
        const videoSrc = `https://www.youtube.com/embed/${id.videoId}`;
        console.log(videoSrc);

        return <iframe src={videoSrc} allowFullScreen title="Video player" />;
      })}
    </React.Fragment>
  );
}

export default VideoTemplate;
