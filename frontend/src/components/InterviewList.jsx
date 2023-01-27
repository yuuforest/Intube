import React from "react";
import getList from "../json/interview_list";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InterviewListItem from "./InterviewListItem";
import "./InterviewList.css";

export default function InterviewList() {
  const newList = getList.interview_list.map((item, index) => {
    return item;
  });
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
