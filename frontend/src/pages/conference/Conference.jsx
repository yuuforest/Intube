import QuestionLIst from "components/conference/QuestionLIst";
import NowQuestion from "components/conference/NowQuestion";
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
import instance from "api/APIController";

export default function Conference() {
  const location = useLocation();
  const interview = location.state.interview;
  const userName = location.state.userName;
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    instance
      .get("http://i8a303.p.ssafy.io:8081/user/me", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
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

  // const micstatus = useSelector(micState)
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
  // const changeMic = useCallback(() => {
  //   dispatch(setMic());
  // }, [dispatch, micState])

  useEffect(() => {
    dispatch(setMic());
  }, [micState, dispatch]);

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
          ></VideoRoomComponents>
        </Grid>
        <Grid item xs={2}>
          <QuestionLIst
            handleChangeQuestion={handleChangeQuestion}
            interview={interview}
          />
        </Grid>
        <Grid item xs={10}>
          <NowQuestion state={state} />
          <AnswerWrite
            state={state}
            micState={micState}
            userInfo={userInfo}
            interview={interview}
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
