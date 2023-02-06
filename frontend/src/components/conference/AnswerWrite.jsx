import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch } from 'react-redux';
import {
  setMic,
  } from 'store/counter/micSlice.js';

export default function AnswerWrite(props) {
  // const [name, setName] = React.useState("");
  // const handleChange = (event) => {
  //   setName(event.target.value);
  //   console.log(name);
  // };
  const dispatch = useDispatch();
  const micState = props.micState 
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'ko' });

    if (micState) {
      dispatch(setMic());
      startListening();
      resetTranscript();
    } else {
      dispatch(setMic())
      SpeechRecognition.stopListening();
    }
  }, [micState, dispatch, resetTranscript])
  
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>{micState ? '적용' : '안됨'}</p>
      {/* <button onClick={() => {dispatch(setMic()); console.log(micstatus); startListening(); resetTranscript()}}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <p>{listening ? transcript : ""}</p>
    </div>
  );

}
