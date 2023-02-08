// 로그인 후 메인 페이지
import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
//
import MainInterviewListItem from "components/main/interview/MainInterviewListItem";
//
import "components/main/interview/MainInterviewList.css";

export default function MainInterviewList(props) {
  return (
    <div className="interviewList">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {props.interviewList.length > 0 &&
            props.interviewList.map((interview) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
                <MainInterviewListItem interview={interview} />
              </Grid>
            ))}
        </Grid>
      </Container>
      {props.interviewList.length === 0 && (
        <CircularProgress sx={{ position: "absolute", top: "50%" }} />
      )}
    </div>
  );
}
