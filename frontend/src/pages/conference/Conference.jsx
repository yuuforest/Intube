import QuestionLIst from "components/conference/QuestionLIst";
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
import http from "api/Http";

export default function Conference() {
  const location = useLocation();
  const interview = location.state.interview;
  const userName = location.state.userName;
  const positionId = location.state.position
  const conferenceID = location.state.conferenceID
  const [userInfo, setUserInfo] = useState([]);
  const [questId, setQuestId] = useState(undefined);

  const [myAnswer, setMyAnswer] = useState({ name: "", answer: "" });

  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    http
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("userInfo", response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [micState, setMicState] = React.useState(true);
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

  useEffect(() => {
    dispatch(setMic());
  }, [micState, dispatch]);

  useEffect(() => {
    http
      .post(
        "/conference/start?interviewTimeID=" + interview.interviewTimeRes.id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("컨퍼런스 아이디", response.data.conferenceID);
        // setConferenceID(response.data.conferenceID);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={9}>
          <VideoRoomComponents
            interview={interview}
            userName={userName}
            navigate={navigate}
            handleMicState={handleMicState}
            state={state}
            setQuestId={setQuestId}
            myAnswer={myAnswer}
          ></VideoRoomComponents>
        </Grid>
        <Grid item>
          <QuestionLIst
            handleChangeQuestion={handleChangeQuestion}
            interview={interview}
            positionId={positionId}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={10}>
          <AnswerWrite
            setMyAnswer={setMyAnswer}
            state={state}
            micState={micState}
            userInfo={userInfo}
            interview={interview}
            handleMicState={handleMicState}
            conferenceId={conferenceID}
            questId={questId}
            setQuestId={setQuestId}
            positionId={positionId}
          ></AnswerWrite>
        </Grid>
      </Grid>
    </div>
  );
}
