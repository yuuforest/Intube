import React from "react";
import getInterviewList from "json/interview_list";
import getAnswererList1 from "json/answerer_list_state1";
import getAnswererList2 from "json/answerer_list_state2";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InterviewListItem from "./InterviewListItem";
import { useLocation } from "react-router-dom";
import "./InterviewList.css";

export default function InterviewList() {
  const location = useLocation();
  const state = location.state;
  let newList = "";
  if (state === "1") {
    newList = getAnswererList1.interview_list.map((item) => {
      return item;
    });
  } else if (state === "2") {
    newList = getAnswererList2.interview_list.map((item) => {
      return item;
    });
  } else {
    newList = getInterviewList.interview_list.map((item) => {
      return item;
    });
  }

  return (
    <div className="interviewList">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {newList.map((interview) => (
            <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
              <InterviewListItem interview={interview} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
