import React from "react";
// import TextField from "@mui/material/TextField";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMic,
  micState
  } from 'store/counter/micSlice.js';

export default function AnswerWrite(props) {
  // const [name, setName] = React.useState("");
  // const handleChange = (event) => {
  //   setName(event.target.value);
  //   console.log(name);
  // };
  const dispatch = useDispatch();
  const micstatus = useSelector(micState)
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'ko' });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>{micstatus ? '적용' : '안됨'}</p>
      <button onClick={() => {dispatch(setMic()); console.log(micstatus); startListening(); resetTranscript()}}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{listening ? transcript : ""}</p>
    </div>
  );
}
