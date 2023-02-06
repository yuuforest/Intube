import QuestionLIst from "components/conference/QuestionLIst";
import NowQuestion from "components/conference/NowQuestion";
import React, { useEffect } from "react";
import AnswerWrite from "components/conference/AnswerWrite";
import VideoRoomComponents from "components/openvidu/VideoRoomComponents";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from 'react-redux';
import {
  setMic,
  // micState
  } from 'store/counter/micSlice.js';


export default function Conference() {
  // const micstatus = useSelector(micState)
  const [micState, setMicState] = React.useState(true)
  const handleMicState = () => {
    setMicState(!micState)
  }
  const [state, setState] = React.useState({
    question: "",
  });
  const handleChangeQuestion = (item) => (event) => {
    console.log(item);
    
    setState({ ...state, question: item });
  };
  const dispatch = useDispatch();
  // const changeMic = useCallback(() => {
  //   dispatch(setMic());
  // }, [dispatch, micState])
  
  useEffect(() => {
    dispatch(setMic());
  }, [micState, dispatch])

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <VideoRoomComponents handleMicState={handleMicState}></VideoRoomComponents>
        </Grid>
        <Grid item xs={2}>
          <QuestionLIst handleChangeQuestion={handleChangeQuestion} />
        </Grid>
        <Grid item xs={10}>
          <NowQuestion state={state} />
          <AnswerWrite state={state} micState={micState}></AnswerWrite>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined">종료</Button>
        </Grid>
      </Grid>
    </div>
  );
}
