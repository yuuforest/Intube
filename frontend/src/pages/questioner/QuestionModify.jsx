import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import QuestionerHeader from "components/questioner/QuestionerHeader";
import ReactPlayer from "react-player/lazy";

import "pages/questioner/Questioner.css";

export default function QuestionModify() {
  const location = useLocation();
  const id = location.state;
  const [videoURL, setVideoURL] = useState("");
  useEffect(() => {
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVideo = () => {
    axios
      .get("https://intube.store/openvidu/api/recordings/Session" + id, {
        headers: { Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU` },
      })
      .then((response) => {
        console.log(response.data);
        setVideoURL(response.data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="question-modify">
      <QuestionerHeader></QuestionerHeader>
      <ReactPlayer url={videoURL} controls className="question-modify-video" />
    </div>
  );
}
