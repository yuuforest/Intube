import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InterviewListItem from "./InterviewListItem";
import { useLocation } from "react-router-dom";
import "./InterviewList.css";

export default function InterviewList() {
  const location = useLocation();
  const state = location.state;
  const [interviewList, setInterviewList] = useState([]);
  console.log(state);
  const selectInterview = () => {
    axios
      .post(
        "http://localhost:8080/interviews/search",
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
    category_name: "",
    word: "",
    pageNumber: 1,
    size: 1,
  };

  return (
    <div className="interviewList">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {interviewList.length > 0 ? (
            interviewList.map((interview) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
                <InterviewListItem interview={interview} />
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
