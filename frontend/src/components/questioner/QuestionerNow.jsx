import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import http from "api/Http";
import VideocamIcon from "@mui/icons-material/Videocam";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { useNavigate } from "react-router-dom";

export default function QuestionerNow(props) {
  const [questionindex, setQuestionIndex] = useState(0);
  const position = 1;
  const navigate = useNavigate();
  const handleChangeQuestionIndex = (event) => {
    setQuestionIndex(event.target.value);
    setTimeid(
      interviewList[event.target.value].interviewTimeDetailResList[0].id
    );
    setTimeindex(0);
  };

  const [timeindex, setTimeindex] = useState(0);
  const [timeid, setTimeid] = useState(-1);

  const handleChangeTimeindex = (event, id) => {
    setTimeindex(event.target.value);
    setTimeid(
      interviewList[questionindex].interviewTimeDetailResList[
        event.target.value
      ].id
    );
  };

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    getInterviewList();
    getAnswererList();
  }, [questionindex, timeindex, props.value]);

  const getInterviewList = () => {
    http
      .post(
        "/user/interviewer?page=0",
        JSON.stringify({ interview_state: 5, word: "" }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setInterviewList(response.data.content);

        if (timeid === -1) {
          setTimeid(interviewList[0].interviewTimeDetailResList[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [AnsewererList, setAnsewererList] = useState([]);

  const getAnswererList = () => {
    http
      .get("/user/interviewer/" + timeid + "/manage-applicant", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAnsewererList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [conferenceID, setConferenceID] = useState([]);

  console.log(interviewList[questionindex]);
  const onClickEnter = async (e) => {
    const interviewId = interviewList[questionindex].id;
    const interviewTimeId = timeid;
    await http
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
        setConferenceID(response.data.conferenceID);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/conference", {
      state: { interviewId, interviewTimeId, position, conferenceID },
    });
  };

  // useEffect(() => {
  //   http
  //     .post(
  //       "/conference/start?interviewTimeID=" + interview.interviewTimeRes.id,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("컨퍼런스 아이디", response.data.conferenceID);
  //       // setConferenceID(response.data.conferenceID);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div hidden={props.value !== 2}>
      {interviewList.length > 0 && (
        <div>
          <FormControl sx={{ mr: 3, background: "white" }}>
            <Select
              value={questionindex}
              onChange={handleChangeQuestionIndex}
              defaultValue={0}
            >
              {interviewList.map((interview, index) => (
                <MenuItem value={index} key={interview.id}>
                  {interview.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mr: 3, background: "white" }}>
            <Select
              value={timeindex}
              onChange={handleChangeTimeindex}
              defaultValue={0}
            >
              {interviewList[questionindex].interviewTimeDetailResList.map(
                (time, index) => (
                  <MenuItem value={index} key={time.id}>
                    {time.interview_start_time}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <div className="question-list">
            <List>
              <ListItem>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                >
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2">지원자</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      자기소개
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      인터뷰온도
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      평가
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              {AnsewererList.map((answerer) => (
                <div className="list-item" key={answerer.id}>
                  <ListItem>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      spacing={3}
                    >
                      <Grid item xs={1} sx={{ textAlign: "center" }}></Grid>
                      <Grid item xs={3} sx={{ textAlign: "left" }}>
                        <Avatar sx={{ float: "left", mr: 2 }}>
                          {answerer.email[0]}
                        </Avatar>
                        <Typography variant="subtitle1">
                          {answerer.name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {answerer.nickname} / {answerer.birth} /
                          {answerer.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle2" gutterBottom>
                          {answerer.introduction}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle2" gutterBottom>
                          {answerer.temperature}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "center" }}>
                        <Button variant="outlined">평가하기</Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
            <Button
              variant="outlined"
              startIcon={<VideocamIcon />}
              sx={{ backgroundColor: "white", m: 3 }}
              size="large"
              onClick={onClickEnter}
            >
              인터뷰 방만들기
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentPasteGoIcon />}
              sx={{ backgroundColor: "white", m: 3 }}
              size="large"
            >
              인터뷰 종료하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
