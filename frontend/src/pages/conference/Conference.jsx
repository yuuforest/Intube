import React, { useEffect, useState } from "react";
import AnswerWrite from "components/conference/AnswerWrite";
import VideoRoomComponents from "components/openvidu/VideoRoomComponents";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setMic,
  // micState
} from "store/counter/micSlice.js";
import instance from "api/APIController";
import ConferenceInfo from "components/conference/ConferenceInfo";
import "pages/conference/Conference.css";

export default function Conference() {
  const location = useLocation();
  const userInfo = location.state.userInfo;
  const interview = location.state.interview;
  const interviewId = location.state.interviewId;
  const interviewTimeId = location.state.interviewTimeId;
  const positionId = location.state.position;
  const conferenceID = location.state.conferenceID;
  const isAvata = location.state.isAvata;
  const [questId, setQuestId] = useState(undefined);
  const [myAnswer, setMyAnswer] = useState({ name: "", answer: "" });

  const [micState, setMicState] = React.useState(false);
  const handleMicState = () => {
    setMicState(!micState);
  };
  const [state, setState] = React.useState({
    question: "",
    id: "",
  });
  const handleChangeQuestion = (item) => (event) => {
    setState({ ...state, question: item.content, id: item.id });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const storeResult = () => {
    instance
      .post(
        "/conference/end?historyID=" +
          localStorage.getItem("historyID") +
          "&conferenceID=" +
          conferenceID +
          "&interviewTimeID=" +
          interviewTimeId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("정상", response);
        localStorage.removeItem("historyID");
      })
      .catch((error) => {
        console.error("에러", error);
      });
  };

  useEffect(() => {
    dispatch(setMic());
  }, [micState, dispatch]);

  // Dialog
  const [open, setOpen] = React.useState(false);
  const toggleInfo = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className="conference">
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} sx={{ backgroundColor: "#F2F7FF" }}>
          <VideoRoomComponents
            interviewTimeId={interviewTimeId}
            userName={userInfo.name}
            navigate={navigate}
            handleMicState={handleMicState}
            state={state}
            setQuestId={setQuestId}
            myAnswer={myAnswer}
            positionId={positionId}
            interviewId={interviewId}
            setQuestionState={setState}
            handleChangeQuestion={handleChangeQuestion}
            conferenceId={conferenceID}
            storeResult={storeResult}
            isAvata={isAvata}
            toggleInfo={toggleInfo}
          ></VideoRoomComponents>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={10}>
          <AnswerWrite
            setMyAnswer={setMyAnswer}
            state={state}
            micState={micState}
            userInfo={userInfo}
            handleMicState={handleMicState}
            conferenceId={conferenceID}
            questId={questId}
            setQuestId={setQuestId}
            positionId={positionId}
          ></AnswerWrite>
        </Grid>
      </Grid>

      <ConferenceInfo
        open={open}
        onClose={handleClose}
        interviewId={interviewId}
        interview={interview}
      />
    </div>
  );
}
