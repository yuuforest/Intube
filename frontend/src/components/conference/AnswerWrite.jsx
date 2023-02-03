import React from "react";
// import TextField from "@mui/material/TextField";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export default function AnswerWrite(props) {
  // const [name, setName] = React.useState("");
  // const handleChange = (event) => {
  //   setName(event.target.value);
  //   console.log(name);
  // };
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
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}
