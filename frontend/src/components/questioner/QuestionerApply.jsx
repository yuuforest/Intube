import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import http from "api/Http";

import "components/questioner/QuestionerApply.css";

export default function QuestionerApply(props) {
  const [questionindex, setQuestionIndex] = useState(0);
  const [timeindex, setTimeindex] = useState(0);
  const [timeid, setTimeid] = useState();
  const [applyNum, setApplyNum] = useState(0);
  const handleChangeQuestionIndex = (event) => {
    setQuestionIndex(event.target.value);
    setTimeid(
      interviewList[event.target.value].interviewTimeDetailResList[0].id
    );
    setApplyNum(
      interviewList[event.target.value].interviewTimeDetailResList[0]
        .apply_applicant_count
    );
    setTimeindex(0);
  };

  const handleChangeTimeindex = (event, id) => {
    setTimeindex(event.target.value);
    setTimeid(
      interviewList[questionindex].interviewTimeDetailResList[
        event.target.value
      ].id
    );
    setApplyNum(
      interviewList[questionindex].interviewTimeDetailResList[
        event.target.value
      ].apply_applicant_count
    );
  };

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    getInterviewList();
  }, [questionindex, timeindex, props.value]);

  const getInterviewList = () => {
    http
      .post(
        "/user/interviewer?page=0",
        JSON.stringify({ interview_state: 4, word: "" }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setInterviewList(response.data.content);
        if (response.data.content.length > 0) {
          setTimeid(
            response.data.content[questionindex].interviewTimeDetailResList[
              timeindex
            ].id
          );
          setApplyNum(
            response.data.content[questionindex].interviewTimeDetailResList[
              timeindex
            ].apply_applicant_count
          );
          getAnswererList(
            response.data.content[questionindex].interviewTimeDetailResList[
              timeindex
            ].id
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [AnsewererList, setAnsewererList] = useState([]);

  const getAnswererList = (id) => {
    http
      .get("/user/interviewer/" + id + "/manage-applicant", {
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

  const acceptHandeler = (e) => {
    console.log(e.target.value);
    http
      .put(
        "/user/interviewer/accept-applicant?applicant_id=" +
          e.target.value +
          "&applicant_state=2",
        {},
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        getInterviewList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div hidden={props.value !== 1}>
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
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ float: "right" }}
            >
              모집인원 : {applyNum}/{interviewList[questionindex].max_people}
            </Typography>

            <List>
              <ListItem>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                >
                  <Grid item xs={1} sx={{ textAlign: "center" }}>
                    <Checkbox />
                  </Grid>
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
                      <Grid item xs={1} sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle2">
                          <Checkbox />
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "left" }}>
                        <Avatar
                          sx={{ height: 82, width: 82, margin: "auto" }}
                          alt="profile"
                          src={
                            "https://303-intube.s3.ap-northeast-2.amazonaws.com/" +
                            answerer.profile_url
                          }
                        />
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
                        {answerer.applicant_state === 1 ? (
                          <div>
                            <Button
                              variant="outlined"
                              value={answerer.id}
                              onClick={acceptHandeler}
                            >
                              합격
                            </Button>
                            <Button variant="outlined" sx={{ ml: 2 }}>
                              불합격
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outlined" value={answerer.id}>
                            합격
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        </div>
      )}
    </div>
  );
}
