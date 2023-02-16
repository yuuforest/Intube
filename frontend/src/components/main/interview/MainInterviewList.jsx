// 로그인 후 메인 페이지
import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
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
          {props.interviewList.length === 0 && (
            <Alert
              severity="error"
              sx={{
                justifyContent: "center",
                pt: 10,
                margin: "auto",
                mt: "25vh",
                width: 500,
                height: 130,
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              검색결과가 없습니다
            </Alert>
          )}
        </Grid>
      </Container>
    </div>
  );
}
