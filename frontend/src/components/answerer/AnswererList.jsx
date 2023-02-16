import React from "react";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import AnswererListItem from "components/answerer/AnswererListItem";
import "components/answerer/AnswererList.css";

export default function AnswererList(props) {
  return (
    <div className="matchingInterviewList">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {props.interviewList.map((interview) => (
            <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
              <AnswererListItem interview={interview} />
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
