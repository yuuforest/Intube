import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDispatch } from "react-redux";
import { setMic } from "store/counter/micSlice.js";
import instance from "api/APIController";
import moment from "moment";

export default function AnswerWrite(props) {
  const dispatch = useDispatch();
  const micState = props.micState;

  const [currentTime, setCurrentTime] = React.useState(
    moment().format("HH:mm:ss")
  );
  // const userInfo = props.userInfo;
  const conferId = props.conferenceId;
  const questId = props.questId;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speechInfo = {
    conferenceID: conferId,
    questionID: questId,
    content: transcript,
    timestamp: currentTime,
  };

  useEffect(() => {
    const startListening = () =>
      SpeechRecognition.startListening({ continuous: true, language: "ko" });

    const promise = new Promise(function (resolve, reject) {
      const x = "geeksforgeeks";
      const y = "geeksforgeeks";

      if (x === y) {
        resolve();
      } else {
        reject();
      }
    });

    if (micState) {
      dispatch(setMic());
      startListening();
      resetTranscript();
      setCurrentTime(moment().format("HH:mm:ss"));
    } else {
      dispatch(setMic());
      props.setMyAnswer({ name: props.userInfo.name, answer: transcript });
      promise
        .then(function () {
          SpeechRecognition.stopListening();
          return;
        })
        .then(function () {
          // console.log("speechInfo", speechInfo);
          return;
        })
        .then(function () {
          if (transcript.trim() !== "") {
            if (questId === undefined) {
              speechInfo.questionID = -1;
              console.log("speechInfo", speechInfo);
            }
            instance
              .post("/conference/dialog/user", JSON.stringify(speechInfo), {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              })
              .then((response) => {
                console.log("working", response.data);
              })
              .catch((error) => {
                console.error(error);
              });
            return;
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micState, dispatch, resetTranscript, setCurrentTime, moment]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <p>{micState ? "적용" : "안됨"}</p>
      <p>{listening ? transcript : ""}</p>
    </div>
  );
}
