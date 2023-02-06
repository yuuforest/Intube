import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MathchingInterviewItem from "pages/Interview/MathchingInterviewItem";
import { useLocation } from "react-router-dom";

export default function MathchingInterview() {
  const location = useLocation();
  const state = location.state;
  const [interviewList, setInterviewList] = useState([]);
  console.log(state);
  const selectInterview = () => {
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/user/interviewee",
        JSON.stringify(searchCondition),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.content);
        setInterviewList(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    selectInterview();
  }, []);

  const searchCondition = {
    applicant_state: 1,
    word: "",
  };

  return (
    <div className="interviewList">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {interviewList.length > 0 ? (
            interviewList.map((interview) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
                <MathchingInterviewItem interview={interview} />
              </Grid>
            ))
          ) : (
            <div>신청한 인터뷰가 없습니다. 인터뷰 찾기에서 신청해보세요</div>
          )}
        </Grid>
      </Container>
    </div>
  );
}
