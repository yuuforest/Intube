import QuestionLIst from "components/conference/QuestionLIst";
import React, { useEffect, useState } from "react";
import AnswerWrite from "components/conference/AnswerWrite";
import VideoRoomComponents from "components/openvidu/VideoRoomComponents";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import AnswererList from "components/conference/AnswererList";
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
  const [userInfo, setUserInfo] = useState([]);
  const [conferenceID, setConferenceID] = useState(1);
  const [questId, setQuestId] = useState(undefined);

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

  const [subscriber, setSubscriber] = React.useState([
    {
      nickname: "",
      connectionId: "",
    },
  ]);

  const handleSubscriber = (item) => {
    setSubscriber(item);
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
      .post("/conference/start?interviewTimeID=" + interview.interviewTimeRes.id,{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log('컨퍼런스 아이디', response.data.conferenceID);
        setConferenceID(response.data.conferenceID);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <VideoRoomComponents
            interview={interview}
            userName={userName}
            navigate={navigate}
            handleSubscriber={handleSubscriber}
            handleMicState={handleMicState}
            state={state}
            setQuestId={setQuestId}
          ></VideoRoomComponents>
        </Grid>
        <Grid item xs={2}>
          <QuestionLIst
            handleChangeQuestion={handleChangeQuestion}
            interview={interview}
          />
        </Grid>
        <Grid item xs={10}>
          <AnswerWrite
            state={state}
            micState={micState}
            userInfo={userInfo}
            interview={interview}
            handleMicState={handleMicState}
            conferenceId={conferenceID}
            questId={questId}
            setQuestId={setQuestId}
          ></AnswerWrite>
        </Grid>
        <Grid item xs={2}>
          <AnswererList subscriber={subscriber}></AnswererList>
          <Button variant="outlined">종료</Button>
        </Grid>
      </Grid>
    </div>
  );
}
