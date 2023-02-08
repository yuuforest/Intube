import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router-dom";

export default function QuestionerApply() {
  const location = useLocation();
  const interview = location.state.interview;
  const index = location.state.index;
  const [AnsewererList, setAnsewererList] = useState([]);
  const searchCondition = {
    interview_state: 4,
    word: "",
  };
  useEffect(() => {
    getAnswererList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAnswererList = () => {
    axios
      .get(
        "http://i8a303.p.ssafy.io:8081/user/interviewer/" +
          interview.interviewTimeDetailResList[index].id +
          "/manage-applicant",
        JSON.stringify(searchCondition),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAnsewererList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const acceptHandeler = (e) => {
    axios
      .put(
        "http://i8a303.p.ssafy.io:8081/user/interviewer/accept-applicant?applicant_id=" +
          e.target.value +
          "&applicant_state=2",
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        getAnswererList();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", ml: 3, mt: 3, textAlign: "center" }}
      >
        {interview.title}{" "}
        {interview.interviewTimeDetailResList[index].interview_start_time}{" "}
        지원자 관리
      </Typography>
      <Divider />
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
                  <Avatar sx={{ float: "left", mr: 2 }}>
                    {answerer.email[0]}
                  </Avatar>
                  <Typography variant="subtitle1">{answerer.name}</Typography>
                  <Typography variant="subtitle2">
                    {answerer.nickname} / {answerer.birth} /{answerer.gender}
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
  );
}
