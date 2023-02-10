import React from "react";
import ReactPlayer from "react-player/lazy";
export default function questionerVideo() {
  return (
    <div>
      <ReactPlayer
        url="https://intube.store/openvidu/recordings/Session34/MyRecording.mp4"
        controls
      />
    </div>
  );
}
