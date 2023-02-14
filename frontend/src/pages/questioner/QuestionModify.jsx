import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import QuestionerHeader from "components/questioner/QuestionerHeader";
import ReactPlayer from "react-player/lazy";
// import http from 'api/Http'

import "pages/questioner/Questioner.css";
import {
  Divider,
  Grid,
  Typography,
  Paper,
  Button,
  MenuItem,
  MenuList,
  TextField,
} from "@mui/material";
import instance from "api/APIController";

export default function QuestionModify() {
  const location = useLocation();
  const id = location.state.timeid;
  const interviewList = location.state.interviewList;
  const questionindex = location.state.questionindex;
  const interviewId = location.state.interviewId;
  const interviewTimeId = location.state.interviewTimeId;
  const timeindex = location.state.timeindex;
  const interview = interviewList[questionindex];
  const [videoURL, setVideoURL] = useState("");
  const [result, setResult] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [nowQuestion, setNowQuestion] = useState("");
  useEffect(() => {
    getStartTime();
    getVideo();
    getQuestion();
    // getScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [content, setContent] = useState([]);
  // const [comment, setComment] = useState("내용");
  // const questionList = content.map((x) =>
  //   x.question_content === null ? (
  //     <p
  //       onClick={() => {
  //         setComment(x.result_content);
  //       }}
  //       key={x.id}
  //     >
  //       INTRO
  //     </p>
  //   ) : (
  //     <p
  //       onClick={() => {
  //         setComment(x.result_content);
  //       }}
  //       key={x.id}
  //     >
  //       {x.question_content}
  //     </p>
  //   )
  // );
  const getVideo = () => {
    axios
      .get("https://intube.store:8443/openvidu/api/recordings/Session" + id, {
        headers: { Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU` },
      })
      .then((response) => {
        console.log(response.data);
        setVideoURL(response.data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getResult = (startTime) => {
    instance
      .get(
        "/result/search/dialog?interview_id=" +
          interviewId +
          "&interview_time_id=" +
          interviewTimeId,
        {
          headers: { Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU` },
        }
      )
      .then((response) => {
        console.log("result", response.data);
        setResult(response.data);

        setResult((result) => {
          let newCondition = [...result];
          const time = startTime.split(" ")[1].split(":");

          const second =
            parseInt(time[0]) * 3600 +
            parseInt(time[1]) * 60 +
            parseInt(time[2]);

          newCondition.forEach((condition) => {
            const myTime = condition.timestamp.split(":");
            console.log("myTime", myTime);
            const mySecond =
              parseInt(myTime[0]) * 3600 +
              parseInt(myTime[1]) * 60 +
              parseInt(myTime[2]);
            condition.second = mySecond - second - 2;
            condition.time = changeSecond(mySecond - second - 2);
          });
          console.log(newCondition);
          return newCondition;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  function changeSecond(seconds) {
    var hour = parseInt(seconds / 3600);
    var min = parseInt((seconds % 3600) / 60);
    var sec = seconds % 60;

    if (hour.toString().length === 1) hour = "0" + hour;

    if (min.toString().length === 1) min = "0" + min;

    if (sec.toString().length === 1) sec = "0" + sec;

    return hour + ":" + min + ":" + sec;
  }
  const getQuestion = () => {
    instance
      .get("/conference/question?interviewID=" + interviewId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getStartTime = async () => {
    await instance
      .post(
        "/conference/start?interviewTimeID=" + interviewTimeId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("컨퍼런스 아이디", response.data.conferenceID);
        instance
          .get(
            "/conference/startInfo?conferenceID=" + response.data.conferenceID
          )
          .then((res) => {
            getResult(res.data);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNowQuestion = (e) => {
    console.log(e.target.value);
    setNowQuestion(e.target.value);
    setIsAll(false);
    setIntro(false);
  };
  const setQuestion = (e, id) => {
    setResult((result) => {
      let newCondition = [...result];

      newCondition.forEach((condition) => {
        if (condition.id === id) condition.dialog_content = e.target.value;
      });
      return newCondition;
    });
  };

  const [isPlaying, setIsPlaying] = React.useState(true);
  const playerRef = React.useRef();

  function changeTime(time) {
    playerRef.current.seekTo(time, "seconds");
  }
  // const getScript = () => {
  //   instance
  //     .get(
  //       "/result/search?interview_id=" +
  //         interviewId +
  //         "&interview_time_id=" +
  //         interviewTimeId,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           "Content-type": "application/json;charset=UTF-8",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("데이터", response.data);
  //       setContent(response.data.conferenceResultRes);
  //       setComment(response.data.conferenceResultRes[0].result_content);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const [isAll, setIsAll] = useState(true);
  const handleAll = () => {
    setIsAll(true);
    setIntro(false);
  };
  const [isIntro, setIntro] = useState(false);
  const handleIntro = () => {
    setIntro(true);
    setIsAll(false);
  };
  return (
    <div className="question-modify">
      <QuestionerHeader></QuestionerHeader>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", my: 8 }}
          >
            {interview.title}
          </Typography>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={8}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 5 }}>
            진행일 :{" "}
            {
              interview.interviewTimeDetailResList[timeindex]
                .interview_start_time
            }
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <ReactPlayer
            url={videoURL}
            controls
            className="question-modify-video"
            ref={playerRef}
          />
          <Paper sx={{ mt: 3 }}>
            <MenuList>
              <MenuItem onClick={handleAll}>전체보기</MenuItem>
              <MenuItem onClick={handleIntro}>Intro</MenuItem>
              {questionList.map((question, index) => (
                <MenuItem
                  value={question.id}
                  key={question.id}
                  onClick={handleNowQuestion}
                >
                  Q{index + 1}. {question.content}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
          <Paper elevation={3} sx={{ mt: 4, ml: 2 }}>
            {isIntro ? (
              <Typography variant="h6" sx={{ py: 3 }}>
                Intro
              </Typography>
            ) : isAll ? (
              <Typography variant="h6" sx={{ py: 3 }}>
                전체보기
              </Typography>
            ) : (
              questionList.map(
                (question) =>
                  question.id === nowQuestion && (
                    <Typography key={question.id} variant="h6" sx={{ py: 3 }}>
                      Q. {question.content}
                    </Typography>
                  )
              )
            )}
            {result.map((result) =>
              isIntro ? (
                result.question_id === null && (
                  <Grid container spacing={3} key={result.id}>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          ml: 3,
                          mt: "3px",
                          "&:hover": {
                            color: "primary.dark",
                            cursor: "pointer",
                          },
                        }}
                        onClick={(e) => changeTime(result.second)}
                        color="primary"
                      >
                        [{result.time}] {result.user_name} :
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={result.dialog_content}
                        sx={{
                          mb: 2,
                        }}
                        multiline
                        maxRows={4}
                        onChange={(e) => setQuestion(e, result.id)}
                      />
                    </Grid>
                  </Grid>
                )
              ) : isAll ? (
                <Grid container spacing={3} key={result.id}>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        ml: 3,
                        mt: "3px",
                        "&:hover": {
                          color: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                      onClick={(e) => changeTime(result.second)}
                      color="primary"
                    >
                      [{result.time}] {result.user_name} :
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={result.dialog_content}
                      sx={{
                        mb: 2,
                      }}
                      multiline
                      maxRows={4}
                      onChange={(e) => setQuestion(e, result.id)}
                    />
                  </Grid>
                </Grid>
              ) : (
                result.question_id === nowQuestion && (
                  <Grid container spacing={3} key={result.id}>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          ml: 3,
                          mt: "3px",
                          "&:hover": {
                            color: "primary.dark",
                            cursor: "pointer",
                          },
                        }}
                        onClick={(e) => changeTime(result.second)}
                        color="primary"
                      >
                        [{result.time}] {result.user_name} :
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={result.dialog_content}
                        sx={{
                          mb: 2,
                        }}
                        multiline
                        maxRows={4}
                        onChange={(e) => setQuestion(e, result.id)}
                      />
                    </Grid>
                  </Grid>
                )
              )
            )}
          </Paper>
        </Grid>
      </Grid>

      <Button variant="outlined" sx={{ mt: 5 }}>
        인터뷰 결과 저장
      </Button>
    </div>
  );
}
