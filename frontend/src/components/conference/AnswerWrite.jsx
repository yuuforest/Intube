import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch } from 'react-redux';
import {
  setMic,
  } from 'store/counter/micSlice.js';
// import instance from 'components/api/APIController';
import moment from 'moment';

export default function AnswerWrite(props) {

  const dispatch = useDispatch();
  const micState = props.micState

  const [currentTime, setCurrentTime] = React.useState(moment().format('HH:mm:ss'))
  const userInfo = props.userInfo
  const conferId = props.interview.id
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const speechInfo = {
    conferenceID: conferId,
    questionID: "1",
    content: transcript,
    userEmail: userInfo.email,
    timestamp: currentTime,
}

  useEffect(() => {
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'ko' });

    const promise = new Promise(function (resolve, reject) {
      const x = "geeksforgeeks";
      const y = "geeksforgeeks";
    
      if (x === y) {
        resolve();
      } else {
        reject();
      }
    });
    
    promise
      .then(function () {
        console.log('Success, You are a GEEK');
      })
      .catch(function () {
        console.log('Some error has occurred');
      });
    if (micState) {
      dispatch(setMic());
      startListening();
      resetTranscript();
      setCurrentTime(moment().format('HH:mm:ss'))
    } else {
      dispatch(setMic())
      promise
      .then(function() {
        SpeechRecognition.stopListening();
        return
      })
        .then(function() {
          console.log('speechInfo', speechInfo)
          return
        })
      // instance
      //   .post(
      //     "http://i8a303.p.ssafy.io:8081/conference/dialog/user",
      //     JSON.stringify(speechInfo),
      //     {
      //       headers: {
      //         "Content-type": "application/json;charset=UTF-8",
      //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response.data)
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }, [micState, dispatch, resetTranscript, setCurrentTime, moment])
  
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
