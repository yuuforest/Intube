import QuestionLIst from "components/conference/QuestionLIst";
import NowQuestion from "components/conference/NowQuestion";
import React from "react";
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
  const dispatch = useDispatch();
  // const micstatus = useSelector(micState)
  const [state, setState] = React.useState({
    question: "",
  });
  const handleChangeQuestion = (item) => (event) => {
    console.log(item);

    setState({ ...state, question: item });
  };
  function changeMic() {
    dispatch(setMic());
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <VideoRoomComponents changeMic={changeMic}></VideoRoomComponents>
        </Grid>
        <Grid item xs={2}>
          <QuestionLIst handleChangeQuestion={handleChangeQuestion} />
        </Grid>
        <Grid item xs={10}>
          <NowQuestion state={state} />
          <AnswerWrite state={state}></AnswerWrite>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined">종료</Button>
        </Grid>
      </Grid>
    </div>
  );
}
