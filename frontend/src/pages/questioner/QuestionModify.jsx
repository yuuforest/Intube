import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import QuestionerHeader from "components/questioner/QuestionerHeader";
import ReactPlayer from "react-player/lazy";
// import http from 'api/Http'

import "pages/questioner/Questioner.css";
import { Divider, Grid, Typography, Paper, Button } from "@mui/material";
import { CompareSharp } from "@mui/icons-material";
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
  useEffect(() => {
    getVideo();
    getScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [content, setContent] = useState([])
  const [comment, setComment] = useState("내용")
  const questionList = content.map((x) => (
    x.question_content === null?
    <p
    onClick={() => {setComment(x.result_content);}} key={x.id}
    >INTRO</p>:
    <p 
    onClick={() => {setComment(x.result_content);}} key={x.id}
    >
      {x.question_content}</p>
  ))
  const getVideo = () => {
    axios
      .get("https://intube.store/openvidu/api/recordings/Session" + id, {
        headers: { Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU` },
      })
      .then(response => {
        console.log(response.data);
        setVideoURL(response.data.url);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getScript = () => {
    instance
    .get("/result/search?interview_id=" + interviewId + '&interview_time_id=' + interviewTimeId,  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json;charset=UTF-8",
      },
    })
    .then((response) => {
      console.log('데이터', response.data);
      setContent(response.data.conferenceResultRes)
      setComment(response.data.conferenceResultRes[0].result_content)
      
    })
    .catch((error) => {
      console.error(error);
    });
  }

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
          />
          <Paper elevation={3} sx={{ mt: 4, ml: 2, height: 320 }}>
            <Typography variant="h6" gutterBottom>
              인터뷰 질문
            </Typography>
            <div>{questionList}</div>
            <Typography variant="h6" gutterBottom>
              인터뷰 내용
            </Typography>
            <div dangerouslySetInnerHTML={ {__html: comment} }></div>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="outlined" sx={{ mt: 5 }}>
        인터뷰 결과 저장
      </Button>
    </div>
  );
}
